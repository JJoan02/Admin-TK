import { EventEmitter } from 'events';
import { TranslationResult } from '../services/TranslationService.js';
export interface SearchResult {
    id: string;
    title: string;
    description?: string;
    url: string;
    thumbnail?: string;
    duration?: string;
    size?: string;
    quality?: string;
    format?: string;
    source: string;
}
export interface DownloadResult {
    success: boolean;
    url?: string;
    filename?: string;
    size?: number;
    format?: string;
    quality?: string;
    error?: string;
}
export interface APIEndpoint {
    name: string;
    baseUrl: string;
    apiKey?: string | undefined;
    rateLimit: number;
    timeout: number;
    retries: number;
}
export declare class InternalAPIService extends EventEmitter {
    private static instance;
    private httpClient;
    private endpoints;
    private rateLimits;
    private translationService;
    private constructor();
    static getInstance(): InternalAPIService;
    /**
     * Configura el cliente HTTP
     */
    private setupHttpClient;
    /**
     * Carga los endpoints de API
     */
    private loadEndpoints;
    /**
     * Verifica rate limiting
     */
    private checkRateLimit;
    /**
     * Busca videos en YouTube
     */
    searchYouTube(query: string, maxResults?: number): Promise<SearchResult[]>;
    /**
     * Descarga video de YouTube
     */
    downloadYouTube(url: string, quality?: string): Promise<DownloadResult>;
    /**
     * Busca música en Spotify
     */
    searchSpotify(query: string, type?: 'track' | 'album' | 'artist', limit?: number): Promise<SearchResult[]>;
    /**
     * Busca y descarga de TikTok
     */
    searchTikTok(username: string, limit?: number): Promise<SearchResult[]>;
    /**
     * Descarga video de TikTok
     */
    downloadTikTok(url: string): Promise<DownloadResult>;
    /**
     * Busca imágenes en Google
     */
    searchGoogleImages(query: string, safe?: 'off' | 'medium' | 'high', num?: number): Promise<SearchResult[]>;
    /**
     * Busca contenido en Instagram
     */
    searchInstagram(hashtag: string, limit?: number): Promise<SearchResult[]>;
    /**
     * Descarga contenido de Instagram
     */
    downloadInstagram(url: string): Promise<DownloadResult>;
    /**
     * Busca contenido en Facebook
     */
    searchFacebook(query: string, type?: 'posts' | 'pages' | 'videos'): Promise<SearchResult[]>;
    /**
     * Obtiene estadísticas de uso de la API
     */
    getAPIStats(): Record<string, any>;
    /**
     * Formatea duración en milisegundos a formato legible
     */
    private formatDuration;
    /**
     * Traduce texto usando el servicio de traducción
     */
    translateText(text: string, langTo: string, langFrom?: string): Promise<TranslationResult>;
    /**
     * Detecta el idioma de un texto
     */
    detectLanguage(text: string): Promise<string>;
    /**
     * Traduce múltiples textos en lote
     */
    translateBatch(texts: string[], langTo: string, langFrom?: string): Promise<TranslationResult[]>;
    /**
     * Obtiene idiomas soportados para traducción
     */
    getSupportedLanguages(): Array<{
        code: string;
        name: string;
        nativeName: string;
    }>;
    /**
     * Verifica si un idioma es soportado
     */
    isLanguageSupported(langCode: string): boolean;
    /**
     * Obtiene información de un idioma
     */
    getLanguageInfo(langCode: string): {
        code: string;
        name: string;
        nativeName: string;
    } | null;
    /**
     * Limpia recursos
     */
    cleanup(): Promise<void>;
}
export default InternalAPIService;
//# sourceMappingURL=InternalAPIService.d.ts.map