// src/services/TranscriptionService.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import crypto from 'crypto';
import { ApiError } from '../core/ErrorHandler.js';
export class TranscriptionService {
    static cache = new Map();
    #genAI;
    #model;
    #config;
    #logger;
    #errorHandler;
    constructor(config, logger, errorHandler) {
        this.#config = config;
        this.#logger = logger;
        this.#errorHandler = errorHandler;
        this.initialize();
    }
    initialize() {
        if (!this.#config.api.geminiApiKey || typeof this.#config.api.geminiApiKey !== 'string' || this.#config.api.geminiApiKey.trim() === '') {
            this.#logger.error('❌ TranscriptionService no iniciado - Gemini API Key faltante o inválida.');
            this.#genAI = null;
            this.#model = null;
            throw new ApiError('Gemini API Key faltante o inválida para TranscriptionService.');
        }
        try {
            this.#genAI = new GoogleGenerativeAI(this.#config.api.geminiApiKey);
            this.#model = this.#genAI.getGenerativeModel({
                model: 'gemini-1.5-pro-latest'
            });
            this.#logger.info('🎤 TranscriptionService inicializado con Gemini');
        }
        catch (error) {
            this.#errorHandler.handleError(error, { context: 'TranscriptionService.initialize' });
            this.#genAI = null;
            this.#model = null;
            throw new ApiError('Error de inicialización de Gemini en TranscriptionService.', error);
        }
    }
    /**
     * Transcribe audio usando Gemini Vision
     * @param {Buffer} audioBuffer - Buffer de audio en formato opus/mp3
     * @param {string} mimeType - Tipo MIME del audio
     * @returns {Promise<{transcription: string, summary: string}>}
     */
    async transcribeAudio(audioBuffer, mimeType = 'audio/mp3') {
        if (!this.#model) {
            this.#logger.error('❌ TranscriptionService no está inicializado. No se puede transcribir.');
            throw new ApiError('Servicio de transcripción no disponible.');
        }
        if (!Buffer.isBuffer(audioBuffer) || audioBuffer.length === 0) {
            this.#logger.warn('transcribeAudio llamado con audioBuffer vacío o inválido.');
            return { transcription: '', summary: 'Audio inválido' };
        }
        if (typeof mimeType !== 'string' || mimeType.trim() === '') {
            this.#logger.warn('transcribeAudio llamado con mimeType vacío o inválido.');
            return { transcription: '', summary: 'Tipo MIME inválido' };
        }
        try {
            const cacheKey = TranscriptionService.#generateCacheKey(audioBuffer);
            if (TranscriptionService.cache.has(cacheKey)) {
                this.#logger.debug('♻️ Usando transcripción desde caché');
                return TranscriptionService.cache.get(cacheKey);
            }
            const base64Data = audioBuffer.toString('base64');
            const prompt = `Analiza este archivo de audio y genera:\n` +
                `1. Transcripción completa (en el idioma original)\n` +
                `2. Resumen de 1-2 frases (en español si es posible)\n` +
                `Responde en JSON: { "transcription": "...", "summary": "..." }`;
            let result;
            try {
                result = await this.#model.generateContent([
                    prompt,
                    { inlineData: { data: base64Data, mimeType } }
                ]);
            }
            catch (geminiError) {
                this.#errorHandler.handleError(geminiError, { context: 'TranscriptionService.transcribeAudio - generateContent' });
                throw new ApiError('Error al generar contenido con Gemini para transcripción.', geminiError);
            }
            const response = await result.response;
            const text = await response.text();
            const responseData = this.#parseGeminiResponse(text);
            TranscriptionService.cache.set(cacheKey, responseData);
            this.#logger.info(`✅ Transcripción generada (${Math.floor(audioBuffer.length / 1024)}KB)`);
            return responseData;
        }
        catch (error) {
            this.#errorHandler.handleError(error, { context: 'TranscriptionService.transcribeAudio' });
            throw new ApiError('Error general en transcribir audio.', error);
        }
    }
    // ======== HELPERS PRIVADOS ======== //
    static #generateCacheKey(buffer) {
        return crypto.createHash('md5').update(buffer).digest('hex');
    }
    #parseGeminiResponse(text) {
        this.#logger.debug(`Respuesta cruda de Gemini: ${text}`);
        try {
            // Intentar encontrar el primer y último corchete/llave para extraer el JSON
            const firstBracket = text.indexOf('{');
            const lastBracket = text.lastIndexOf('}');
            const firstSquare = text.indexOf('[');
            const lastSquare = text.lastIndexOf(']');
            let jsonString = '';
            if (firstBracket !== -1 && lastBracket !== -1 && firstBracket < lastBracket) {
                jsonString = text.substring(firstBracket, lastBracket + 1);
            }
            else if (firstSquare !== -1 && lastSquare !== -1 && firstSquare < lastSquare) {
                jsonString = text.substring(firstSquare, lastSquare + 1);
            }
            else {
                this.#logger.warn('⚠️ La respuesta de Gemini no contiene una estructura JSON reconocible.');
                return { transcription: text, summary: 'Respuesta no JSON' };
            }
            return JSON.parse(jsonString);
        }
        catch (error) {
            this.#errorHandler.handleError(error, { context: 'TranscriptionService.#parseGeminiResponse', rawText: text });
            this.#logger.warn({ err: error, rawText: text }, '⚠️ La respuesta de Gemini no fue JSON válido o no se pudo parsear.');
            return { transcription: text, summary: 'Error al parsear respuesta' };
        }
    }
}
export default TranscriptionService;
//# sourceMappingURL=TranscriptionService.js.map