// src/core/JobQueue.js
import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();
import Metrics from '../utils/Metrics.js';
import EventBus from './EventBus.js'; // Para emitir eventos de la cola
const JOB_STATUS = {
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED',
    TIMED_OUT: 'TIMED_OUT',
};
/**
 * Gestiona una cola de trabajos asíncrona para procesar tareas una por una.
 * Incluye reintentos, tiempos de espera y métricas.
 */
export class JobQueue {
    /**
     * @param {Function} processor - La función que se ejecutará para cada trabajo. Debe ser una función async que acepte un 'job' como argumento.
     * @param {object} options - Opciones de configuración para la cola.
     * @param {number} [options.maxRetries=3] - Número máximo de reintentos para un trabajo fallido.
     * @param {number} [options.jobTimeoutMs=60000] - Tiempo máximo en milisegundos que un trabajo puede tardar antes de ser marcado como TIMED_OUT.
     */
    constructor(processor, options = {}) {
        if (typeof processor !== 'function') {
            throw new Error('JobQueue requiere una función de procesamiento válida.');
        }
        this.processor = processor;
        this.queue = [];
        this.isProcessing = false;
        this.stopping = false; // Bandera para el apagado elegante
        this.processingJob = null; // Referencia al trabajo actual
        this.options = {
            maxRetries: options.maxRetries || 3,
            jobTimeoutMs: options.jobTimeoutMs || 60000, // 60 segundos
        };
        logger.info(`JobQueue inicializada con maxRetries: ${this.options.maxRetries}, jobTimeoutMs: ${this.options.jobTimeoutMs / 1000}s.`);
    }
    /**
     * Añade un nuevo trabajo a la cola y comienza a procesar si no se está haciendo ya.
     * @param {any} payload - El dato o contexto del trabajo a procesar.
     */
    add(payload) {
        if (this.stopping) {
            logger.warn('JobQueue está en proceso de apagado. No se añadirán nuevos trabajos.');
            return;
        }
        const job = {
            id: `job_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`, // ID único para el trabajo
            payload: payload,
            attempts: 0,
            createdAt: Date.now(),
            status: JOB_STATUS.PENDING,
        };
        this.queue.push(job);
        Metrics.increment('job_queue.queued_total');
        EventBus.emit('job_queue.job_added', job);
        logger.debug(`Nuevo trabajo ${job.id} añadido a la cola. Trabajos pendientes: ${this.queue.length}`);
        this._processNext();
    }
    /**
     * El motor de la cola. Procesa el siguiente trabajo si hay uno disponible y no se está procesando nada.
     * @private
     */
    async _processNext() {
        if (this.isProcessing || this.queue.length === 0) {
            if (this.stopping && this.queue.length === 0 && !this.isProcessing) {
                EventBus.emit('job_queue.stopped');
                logger.info('JobQueue: Todos los trabajos procesados. Cola detenida.');
            }
            return;
        }
        this.isProcessing = true;
        this.processingJob = this.queue.shift(); // Tomar el primer trabajo de la cola (FIFO)
        this.processingJob.status = JOB_STATUS.PROCESSING;
        this.processingJob.attempts++;
        Metrics.messagesReceivedCounter.inc(); // Incrementar contador de mensajes recibidos
        Metrics.commandExecutionsCounter.inc({ command_name: this.processingJob.payload.command || 'autonomous_ai', status: 'processing' });
        Metrics.increment('job_queue.processing_total');
        EventBus.emit('job_queue.job_started', this.processingJob);
        logger.info(`Procesando trabajo ${this.processingJob.id} (Intento: ${this.processingJob.attempts}). Trabajos restantes en cola: ${this.queue.length}`);
        const endJobTimer = Metrics.aiResponseTimeHistogram.startTimer(); // Iniciar temporizador para la duración del trabajo
        let jobResult;
        let jobError = null;
        try {
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error(`Job timed out after ${this.options.jobTimeoutMs}ms`)), this.options.jobTimeoutMs));
            jobResult = await Promise.race([this.processor(this.processingJob.payload), timeoutPromise]);
            this.processingJob.status = JOB_STATUS.COMPLETED;
            Metrics.commandExecutionsCounter.inc({ command_name: this.processingJob.payload.command || 'autonomous_ai', status: 'completed' });
            Metrics.increment('job_queue.completed_total');
            EventBus.emit('job_queue.job_completed', this.processingJob);
        }
        catch (error) {
            jobError = error;
            logger.error({ err: error, job: this.processingJob.id }, `❌ Error al procesar trabajo ${this.processingJob.id}.`);
            Metrics.commandExecutionsCounter.inc({ command_name: this.processingJob.payload.command || 'autonomous_ai', status: 'failed' });
            Metrics.increment('job_queue.failed_total');
            if (this.processingJob.attempts < this.options.maxRetries) {
                this.processingJob.status = JOB_STATUS.PENDING; // Volver a poner en pendiente para reintento
                this.queue.push(this.processingJob); // Reencolar para reintento
                Metrics.increment('job_queue.retried_total');
                EventBus.emit('job_queue.job_retried', this.processingJob);
                logger.warn(`Reintentando trabajo ${this.processingJob.id}. Intento ${this.processingJob.attempts}/${this.options.maxRetries}.`);
            }
            else {
                this.processingJob.status = JOB_STATUS.FAILED;
                if (error.message.includes('timed out')) {
                    this.processingJob.status = JOB_STATUS.TIMED_OUT;
                    Metrics.increment('job_queue.timed_out_total');
                    EventBus.emit('job_queue.job_timed_out', this.processingJob);
                    logger.error(`Trabajo ${this.processingJob.id} ha excedido el tiempo de espera y no será reintentado.`);
                }
                else {
                    EventBus.emit('job_queue.job_failed', this.processingJob, error);
                    logger.error(`Trabajo ${this.processingJob.id} falló después de ${this.processingJob.attempts} intentos y no será reintentado.`);
                }
            }
        }
        finally {
            endJobTimer(); // Detener el temporizador y observar la duración
            const jobDuration = Date.now() - jobStartTime;
            Metrics.gauge('job_queue.job_duration_ms', jobDuration);
            this.isProcessing = false;
            this.processingJob = null;
            // Una vez terminado, intentar procesar el siguiente trabajo de la cola
            this._processNext();
        }
    }
    /**
     * Inicia el proceso de apagado elegante de la cola.
     * Espera a que el trabajo actual termine y no acepta nuevos trabajos.
     * @returns {Promise<void>} Una promesa que se resuelve cuando la cola está vacía y detenida.
     */
    async stop() {
        this.stopping = true;
        logger.info('JobQueue: Iniciando apagado elegante. No se aceptarán nuevos trabajos.');
        if (this.queue.length === 0 && !this.isProcessing) {
            EventBus.emit('job_queue.stopped');
            logger.info('JobQueue: Cola ya vacía. Detenida.');
            return Promise.resolve();
        }
        return new Promise(resolve => {
            EventBus.once('job_queue.stopped', () => resolve());
        });
    }
    /**
     * Obtiene el número de trabajos pendientes en la cola.
     * @returns {number}
     */
    get pendingJobsCount() {
        return this.queue.length;
    }
    /**
     * Comprueba si la cola está procesando un trabajo actualmente.
     * @returns {boolean}
     */
    get isCurrentlyProcessing() {
        return this.isProcessing;
    }
}
export default JobQueue;
//# sourceMappingURL=JobQueue.js.map