// src/api/InternalAPIService.ts - API interna para búsquedas, descargas y traducción
import axios from 'axios';
import { createModuleLogger } from '../utils/logger.js';
import { EventEmitter } from 'events';
import { TranslationService } from '../services/TranslationService.js';
const logger = createModuleLogger('InternalAPIService');
export class InternalAPIService extends EventEmitter {
    static instance;
    httpClient;
    endpoints = new Map();
    rateLimits = new Map();
    translationService;
    constructor() {
        super();
        this.setupHttpClient();
        this.loadEndpoints();
        this.translationService = new TranslationService();
    }
    static getInstance() {
        if (!InternalAPIService.instance) {
            InternalAPIService.instance = new InternalAPIService();
        }
        return InternalAPIService.instance;
    }
    /**
     * Configura el cliente HTTP
     */
    setupHttpClient() {
        this.httpClient = axios.create({
            timeout: 30000,
            headers: {
                'User-Agent': 'Admin-TK-Bot/3.0 (Internal API Service)',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        // Interceptor para logging
        this.httpClient.interceptors.request.use((config) => {
            logger.debug({ url: config.url, method: config.method }, 'API Request');
            return config;
        }, (error) => {
            logger.error({ err: error }, 'API Request Error');
            return Promise.reject(error);
        });
        this.httpClient.interceptors.response.use((response) => {
            logger.debug({
                url: response.config.url,
                status: response.status,
                dataSize: JSON.stringify(response.data).length
            }, 'API Response');
            return response;
        }, (error) => {
            logger.error({
                err: error,
                url: error.config?.url,
                status: error.response?.status
            }, 'API Response Error');
            return Promise.reject(error);
        });
    }
    /**
     * Carga los endpoints de API
     */
    loadEndpoints() {
        // YouTube API
        this.endpoints.set('youtube', {
            name: 'YouTube Data API',
            baseUrl: 'https://www.googleapis.com/youtube/v3',
            apiKey: process.env.YOUTUBE_API_KEY,
            rateLimit: 100,
            timeout: 15000,
            retries: 3
        });
        // Spotify API
        this.endpoints.set('spotify', {
            name: 'Spotify Web API',
            baseUrl: 'https://api.spotify.com/v1',
            apiKey: process.env.SPOTIFY_API_KEY,
            rateLimit: 100,
            timeout: 10000,
            retries: 2
        });
        // TikTok API (usando servicio externo)
        this.endpoints.set('tiktok', {
            name: 'TikTok Scraper API',
            baseUrl: 'https://api.tiklydown.eu.org/api',
            rateLimit: 50,
            timeout: 20000,
            retries: 3
        });
        // Instagram API
        this.endpoints.set('instagram', {
            name: 'Instagram Basic Display API',
            baseUrl: 'https://graph.instagram.com',
            apiKey: process.env.INSTAGRAM_API_KEY,
            rateLimit: 200,
            timeout: 15000,
            retries: 2
        });
        // Facebook API
        this.endpoints.set('facebook', {
            name: 'Facebook Graph API',
            baseUrl: 'https://graph.facebook.com/v18.0',
            apiKey: process.env.FACEBOOK_API_KEY,
            rateLimit: 200,
            timeout: 15000,
            retries: 2
        });
        // Google Images API
        this.endpoints.set('google-images', {
            name: 'Google Custom Search API',
            baseUrl: 'https://www.googleapis.com/customsearch/v1',
            apiKey: process.env.GOOGLE_API_KEY,
            rateLimit: 100,
            timeout: 10000,
            retries: 2
        });
        // Pinterest API
        this.endpoints.set('pinterest', {
            name: 'Pinterest API',
            baseUrl: 'https://api.pinterest.com/v5',
            apiKey: process.env.PINTEREST_API_KEY,
            rateLimit: 1000,
            timeout: 10000,
            retries: 2
        });
        // Translation Service (interno)
        this.endpoints.set('translation', {
            name: 'Translation Service',
            baseUrl: 'internal://translation',
            rateLimit: 500, // Límite más alto para traducción
            timeout: 15000,
            retries: 2
        });
        logger.info(`📡 Cargados ${this.endpoints.size} endpoints de API`);
    }
    /**
     * Verifica rate limiting
     */
    checkRateLimit(endpointName) {
        const endpoint = this.endpoints.get(endpointName);
        if (!endpoint)
            return false;
        const now = Date.now();
        const rateLimit = this.rateLimits.get(endpointName);
        if (!rateLimit) {
            this.rateLimits.set(endpointName, { count: 1, resetTime: now + 60000 });
            return true;
        }
        if (now > rateLimit.resetTime) {
            this.rateLimits.set(endpointName, { count: 1, resetTime: now + 60000 });
            return true;
        }
        if (rateLimit.count >= endpoint.rateLimit) {
            return false;
        }
        rateLimit.count++;
        return true;
    }
    /**
     * Busca videos en YouTube
     */
    async searchYouTube(query, maxResults = 10) {
        if (!this.checkRateLimit('youtube')) {
            throw new Error('Rate limit excedido para YouTube API');
        }
        const endpoint = this.endpoints.get('youtube');
        try {
            const response = await this.httpClient.get(`${endpoint.baseUrl}/search`, {
                params: {
                    part: 'snippet',
                    q: query,
                    type: 'video',
                    maxResults,
                    key: endpoint.apiKey
                },
                timeout: endpoint.timeout
            });
            const results = response.data.items.map((item) => ({
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                thumbnail: item.snippet.thumbnails.medium?.url,
                source: 'youtube'
            }));
            this.emit('searchCompleted', { service: 'youtube', query, results: results.length });
            return results;
        }
        catch (error) {
            logger.error({ err: error, query }, 'Error en búsqueda de YouTube');
            throw new Error('Error al buscar en YouTube');
        }
    }
    /**
     * Descarga video de YouTube
     */
    async downloadYouTube(url, quality = '720p') {
        if (!this.checkRateLimit('youtube')) {
            throw new Error('Rate limit excedido para YouTube API');
        }
        try {
            // Usar ytdl-core o similar para descarga
            const ytdl = await import('ytdl-core');
            if (!ytdl.validateURL(url)) {
                return {
                    success: false,
                    error: 'URL de YouTube inválida'
                };
            }
            const info = await ytdl.getInfo(url);
            const format = ytdl.chooseFormat(info.formats, { quality });
            return {
                success: true,
                url: format.url,
                filename: `${info.videoDetails.title}.${format.container}`,
                size: parseInt(format.contentLength || '0'),
                format: format.container,
                quality: format.qualityLabel
            };
        }
        catch (error) {
            logger.error({ err: error, url }, 'Error en descarga de YouTube');
            return {
                success: false,
                error: 'Error al descargar video de YouTube'
            };
        }
    }
    /**
     * Busca música en Spotify
     */
    async searchSpotify(query, type = 'track', limit = 10) {
        if (!this.checkRateLimit('spotify')) {
            throw new Error('Rate limit excedido para Spotify API');
        }
        const endpoint = this.endpoints.get('spotify');
        try {
            // Primero obtener token de acceso
            const tokenResponse = await this.httpClient.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
                headers: {
                    'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            const accessToken = tokenResponse.data.access_token;
            const response = await this.httpClient.get(`${endpoint.baseUrl}/search`, {
                params: {
                    q: query,
                    type,
                    limit
                },
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                timeout: endpoint.timeout
            });
            const items = response.data[`${type}s`].items;
            const results = items.map((item) => ({
                id: item.id,
                title: item.name,
                description: type === 'track' ? item.artists.map((a) => a.name).join(', ') : item.description,
                url: item.external_urls.spotify,
                thumbnail: item.images?.[0]?.url,
                duration: type === 'track' ? this.formatDuration(item.duration_ms) : undefined,
                source: 'spotify'
            }));
            this.emit('searchCompleted', { service: 'spotify', query, results: results.length });
            return results;
        }
        catch (error) {
            logger.error({ err: error, query }, 'Error en búsqueda de Spotify');
            throw new Error('Error al buscar en Spotify');
        }
    }
    /**
     * Busca y descarga de TikTok
     */
    async searchTikTok(username, limit = 10) {
        if (!this.checkRateLimit('tiktok')) {
            throw new Error('Rate limit excedido para TikTok API');
        }
        const endpoint = this.endpoints.get('tiktok');
        try {
            const response = await this.httpClient.get(`${endpoint.baseUrl}/user/posts`, {
                params: {
                    username,
                    count: limit
                },
                timeout: endpoint.timeout
            });
            const results = response.data.data.map((item) => ({
                id: item.id,
                title: item.desc || 'TikTok Video',
                description: `Por @${item.author.unique_id}`,
                url: `https://www.tiktok.com/@${item.author.unique_id}/video/${item.id}`,
                thumbnail: item.video.cover,
                duration: `${item.video.duration}s`,
                source: 'tiktok'
            }));
            this.emit('searchCompleted', { service: 'tiktok', query: username, results: results.length });
            return results;
        }
        catch (error) {
            logger.error({ err: error, username }, 'Error en búsqueda de TikTok');
            throw new Error('Error al buscar en TikTok');
        }
    }
    /**
     * Descarga video de TikTok
     */
    async downloadTikTok(url) {
        if (!this.checkRateLimit('tiktok')) {
            throw new Error('Rate limit excedido para TikTok API');
        }
        const endpoint = this.endpoints.get('tiktok');
        try {
            const response = await this.httpClient.get(`${endpoint.baseUrl}/download`, {
                params: { url },
                timeout: endpoint.timeout
            });
            if (response.data.success) {
                return {
                    success: true,
                    url: response.data.data.play,
                    filename: `tiktok_${Date.now()}.mp4`,
                    format: 'mp4',
                    quality: response.data.data.quality || 'HD'
                };
            }
            else {
                return {
                    success: false,
                    error: response.data.message || 'Error al descargar TikTok'
                };
            }
        }
        catch (error) {
            logger.error({ err: error, url }, 'Error en descarga de TikTok');
            return {
                success: false,
                error: 'Error al descargar video de TikTok'
            };
        }
    }
    /**
     * Busca imágenes en Google
     */
    async searchGoogleImages(query, safe = 'medium', num = 10) {
        if (!this.checkRateLimit('google-images')) {
            throw new Error('Rate limit excedido para Google Images API');
        }
        const endpoint = this.endpoints.get('google-images');
        try {
            const response = await this.httpClient.get(endpoint.baseUrl, {
                params: {
                    key: endpoint.apiKey,
                    cx: process.env.GOOGLE_SEARCH_ENGINE_ID,
                    q: query,
                    searchType: 'image',
                    safe,
                    num
                },
                timeout: endpoint.timeout
            });
            const results = response.data.items?.map((item) => ({
                id: item.cacheId || item.link,
                title: item.title,
                description: item.snippet,
                url: item.link,
                thumbnail: item.image.thumbnailLink,
                size: `${item.image.width}x${item.image.height}`,
                format: item.fileFormat,
                source: 'google-images'
            })) || [];
            this.emit('searchCompleted', { service: 'google-images', query, results: results.length });
            return results;
        }
        catch (error) {
            logger.error({ err: error, query }, 'Error en búsqueda de Google Images');
            throw new Error('Error al buscar imágenes en Google');
        }
    }
    /**
     * Busca contenido en Instagram
     */
    async searchInstagram(hashtag, limit = 10) {
        if (!this.checkRateLimit('instagram')) {
            throw new Error('Rate limit excedido para Instagram API');
        }
        try {
            // Implementar búsqueda de Instagram usando scraping o API oficial
            // Por ahora retornamos array vacío
            logger.warn('Instagram search no implementado completamente');
            return [];
        }
        catch (error) {
            logger.error({ err: error, hashtag }, 'Error en búsqueda de Instagram');
            throw new Error('Error al buscar en Instagram');
        }
    }
    /**
     * Descarga contenido de Instagram
     */
    async downloadInstagram(url) {
        if (!this.checkRateLimit('instagram')) {
            throw new Error('Rate limit excedido para Instagram API');
        }
        try {
            // Implementar descarga de Instagram
            logger.warn('Instagram download no implementado completamente');
            return {
                success: false,
                error: 'Descarga de Instagram no implementada'
            };
        }
        catch (error) {
            logger.error({ err: error, url }, 'Error en descarga de Instagram');
            return {
                success: false,
                error: 'Error al descargar de Instagram'
            };
        }
    }
    /**
     * Busca contenido en Facebook
     */
    async searchFacebook(query, type = 'posts') {
        if (!this.checkRateLimit('facebook')) {
            throw new Error('Rate limit excedido para Facebook API');
        }
        try {
            // Implementar búsqueda de Facebook
            logger.warn('Facebook search no implementado completamente');
            return [];
        }
        catch (error) {
            logger.error({ err: error, query }, 'Error en búsqueda de Facebook');
            throw new Error('Error al buscar en Facebook');
        }
    }
    /**
     * Obtiene estadísticas de uso de la API
     */
    getAPIStats() {
        const stats = {};
        for (const [name, rateLimit] of this.rateLimits.entries()) {
            const endpoint = this.endpoints.get(name);
            stats[name] = {
                requests: rateLimit.count,
                limit: endpoint?.rateLimit || 0,
                resetTime: new Date(rateLimit.resetTime),
                remaining: Math.max(0, (endpoint?.rateLimit || 0) - rateLimit.count)
            };
        }
        return stats;
    }
    /**
     * Formatea duración en milisegundos a formato legible
     */
    formatDuration(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        if (hours > 0) {
            return `${hours}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
        }
        else {
            return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
        }
    }
    /**
     * Traduce texto usando el servicio de traducción
     */
    async translateText(text, langTo, langFrom = 'auto') {
        if (!this.checkRateLimit('translation')) {
            throw new Error('Rate limit excedido para Translation API');
        }
        try {
            logger.info(`🌐 Traduciendo texto: ${langFrom} → ${langTo}`);
            const result = await this.translationService.translate(text, langTo, langFrom);
            this.emit('translationCompleted', {
                from: langFrom,
                to: langTo,
                textLength: text.length,
                success: true
            });
            return result;
        }
        catch (error) {
            logger.error({ err: error, text: text.substring(0, 50) }, 'Error en traducción');
            this.emit('translationCompleted', {
                from: langFrom,
                to: langTo,
                textLength: text.length,
                success: false,
                error: error instanceof Error ? error.message : 'Error desconocido'
            });
            throw error;
        }
    }
    /**
     * Detecta el idioma de un texto
     */
    async detectLanguage(text) {
        if (!this.checkRateLimit('translation')) {
            throw new Error('Rate limit excedido para Translation API');
        }
        try {
            logger.info(`🔍 Detectando idioma del texto`);
            const detectedLang = await this.translationService.detectLanguage(text);
            this.emit('languageDetected', {
                textLength: text.length,
                detectedLanguage: detectedLang,
                success: true
            });
            return detectedLang;
        }
        catch (error) {
            logger.error({ err: error, text: text.substring(0, 50) }, 'Error detectando idioma');
            this.emit('languageDetected', {
                textLength: text.length,
                success: false,
                error: error instanceof Error ? error.message : 'Error desconocido'
            });
            throw error;
        }
    }
    /**
     * Traduce múltiples textos en lote
     */
    async translateBatch(texts, langTo, langFrom = 'auto') {
        if (!this.checkRateLimit('translation')) {
            throw new Error('Rate limit excedido para Translation API');
        }
        try {
            logger.info(`📦 Traduciendo lote de ${texts.length} textos: ${langFrom} → ${langTo}`);
            const results = await this.translationService.translateBatch(texts, langTo, langFrom);
            this.emit('batchTranslationCompleted', {
                from: langFrom,
                to: langTo,
                count: texts.length,
                success: true
            });
            return results;
        }
        catch (error) {
            logger.error({ err: error, count: texts.length }, 'Error en traducción por lotes');
            this.emit('batchTranslationCompleted', {
                from: langFrom,
                to: langTo,
                count: texts.length,
                success: false,
                error: error instanceof Error ? error.message : 'Error desconocido'
            });
            throw error;
        }
    }
    /**
     * Obtiene idiomas soportados para traducción
     */
    getSupportedLanguages() {
        return this.translationService.getSupportedLanguages();
    }
    /**
     * Verifica si un idioma es soportado
     */
    isLanguageSupported(langCode) {
        return this.translationService.isLanguageSupported(langCode);
    }
    /**
     * Obtiene información de un idioma
     */
    getLanguageInfo(langCode) {
        return this.translationService.getLanguageInfo(langCode);
    }
    /**
     * Limpia recursos
     */
    async cleanup() {
        this.rateLimits.clear();
        this.removeAllListeners();
        logger.info('🧹 InternalAPIService limpiado');
    }
}
export default InternalAPIService;
//# sourceMappingURL=InternalAPIService.js.map