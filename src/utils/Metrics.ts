// src/utils/Metrics.js

import client from 'prom-client';
import { initializeLogger } from './logger.js';
const logger = initializeLogger();

// Crear un registro para las métricas
const register = new client.Registry();

// Recolectar métricas por defecto de Node.js (CPU, memoria, etc.)
client.collectDefaultMetrics({ register });

// Definir métricas personalizadas
const messagesReceivedCounter = new client.Counter({
  name: 'app_messages_received_total',
  help: 'Total de mensajes recibidos por el bot.',
});

const commandExecutionsCounter = new client.Counter({
  name: 'app_command_executions_total',
  help: 'Total de comandos ejecutados por el bot.',
  labelNames: ['command_name', 'status'],
});

const aiResponseTimeHistogram = new client.Histogram({
  name: 'app_ai_response_time_seconds',
  help: 'Tiempo de respuesta de la IA en segundos.',
  buckets: client.linearBuckets(0.1, 0.1, 10), // 0.1 a 1.0 segundos
});

const dbQueryTimeHistogram = new client.Histogram({
  name: 'app_db_query_time_seconds',
  help: 'Tiempo de ejecución de consultas a la base de datos en segundos.',
  buckets: client.linearBuckets(0.01, 0.01, 10), // 0.01 a 0.1 segundos
});

const errorsTotalCounter = new client.Counter({
  name: 'app_errors_total',
  help: 'Total de errores ocurridos en la aplicación.',
  labelNames: ['context'],
});

const activeConnectionsGauge = new client.Gauge({
  name: 'app_active_connections',
  help: 'Número de conexiones activas al bot.',
});

// Custom metrics for JobQueue
const jobQueueQueuedTotal = new client.Counter({
  name: 'job_queue_queued_total',
  help: 'Total de trabajos añadidos a la cola.',
});

const jobQueueProcessingTotal = new client.Counter({
  name: 'job_queue_processing_total',
  help: 'Total de trabajos en procesamiento.',
});

const jobQueueCompletedTotal = new client.Counter({
  name: 'job_queue_completed_total',
  help: 'Total de trabajos completados.',
});

const jobQueueFailedTotal = new client.Counter({
  name: 'job_queue_failed_total',
  help: 'Total de trabajos fallidos.',
});

const jobQueueRetriedTotal = new client.Counter({
  name: 'job_queue_retried_total',
  help: 'Total de trabajos reintentados.',
});

const jobQueueTimedOutTotal = new client.Counter({
  name: 'job_queue_timed_out_total',
  help: 'Total de trabajos que excedieron el tiempo de espera.',
});

const jobQueueJobDurationMs = new client.Gauge({
  name: 'job_queue_job_duration_ms',
  help: 'Duración del trabajo en milisegundos.',
});


// Create a Metrics object that encapsulates all metrics and provides helper methods
const Metrics = {
  register,
  messagesReceivedCounter,
  commandExecutionsCounter,
  aiResponseTimeHistogram,
  dbQueryTimeHistogram,
  errorsTotalCounter,
  activeConnectionsGauge,
  // JobQueue specific metrics
  jobQueueQueuedTotal,
  jobQueueProcessingTotal,
  jobQueueCompletedTotal,
  jobQueueFailedTotal,
  jobQueueRetriedTotal,
  jobQueueTimedOutTotal,
  jobQueueJobDurationMs,

  // Helper methods
  increment: (metricName, labels = {}) => {
    switch (metricName) {
      case 'job_queue.queued_total':
        jobQueueQueuedTotal.inc(labels);
        break;
      case 'job_queue.processing_total':
        jobQueueProcessingTotal.inc(labels);
        break;
      case 'job_queue.completed_total':
        jobQueueCompletedTotal.inc(labels);
        break;
      case 'job_queue.failed_total':
        jobQueueFailedTotal.inc(labels);
        break;
      case 'job_queue.retried_total':
        jobQueueRetriedTotal.inc(labels);
        break;
      case 'job_queue.timed_out_total':
        jobQueueTimedOutTotal.inc(labels);
        break;
      default:
        logger.warn(`Métrica desconocida para incrementar: ${metricName}`);
    }
  },
  gauge: (metricName, value, labels = {}) => {
    switch (metricName) {
      case 'job_queue.job_duration_ms':
        jobQueueJobDurationMs.set(labels, value);
        break;
      default:
        logger.warn(`Métrica desconocida para gauge: ${metricName}`);
    }
  },
  startLogging: () => {
    logger.info('📊 Iniciando el registro de métricas.');
    // Aquí se podría añadir lógica para exponer las métricas vía HTTP, etc.
  },
};

logger.info('Métricas inicializadas.');

export default Metrics;