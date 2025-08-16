export interface TranslationResult {
    text: string;
    from: {
        language: {
            didYouMean: boolean;
            iso: string;
        };
        text: {
            autoCorrected: boolean;
            value: string;
            didYouMean: boolean;
        };
    };
    raw: string;
}
export interface SupportedLanguage {
    code: string;
    name: string;
    nativeName: string;
}
export declare class TranslationService {
    private readonly logger;
    private readonly supportedLanguages;
    constructor();
    /**
     * Traduce texto de un idioma a otro
     * @param text - Texto a traducir
     * @param langTo - Idioma de destino (código ISO)
     * @param langFrom - Idioma de origen (por defecto 'auto' para detección automática)
     * @returns Resultado de la traducción
     */
    translate(text: string, langTo: string, langFrom?: string): Promise<TranslationResult>;
    /**
     * Detecta el idioma de un texto
     * @param text - Texto para detectar idioma
     * @returns Código ISO del idioma detectado
     */
    detectLanguage(text: string): Promise<string>;
    /**
     * Obtiene la lista de idiomas soportados
     * @returns Array de idiomas soportados
     */
    getSupportedLanguages(): SupportedLanguage[];
    /**
     * Verifica si un idioma es soportado
     * @param langCode - Código del idioma
     * @returns true si es soportado, false en caso contrario
     */
    isLanguageSupported(langCode: string): boolean;
    /**
     * Obtiene información de un idioma por su código
     * @param langCode - Código del idioma
     * @returns Información del idioma o null si no se encuentra
     */
    getLanguageInfo(langCode: string): SupportedLanguage | null;
    /**
     * Traduce múltiples textos en lote
     * @param texts - Array de textos a traducir
     * @param langTo - Idioma de destino
     * @param langFrom - Idioma de origen (por defecto 'auto')
     * @returns Array de resultados de traducción
     */
    translateBatch(texts: string[], langTo: string, langFrom?: string): Promise<TranslationResult[]>;
    /**
     * Obtiene estadísticas del servicio
     * @returns Estadísticas básicas
     */
    getStats(): {
        supportedLanguages: number;
        isAvailable: boolean;
        version: string;
    };
    /**
     * Normaliza códigos de idioma a formato estándar
     * @param langCode - Código de idioma a normalizar
     * @returns Código normalizado
     */
    private normalizeLanguageCode;
    /**
     * Valida que el texto no exceda límites razonables
     * @param text - Texto a validar
     * @returns true si es válido, false en caso contrario
     */
    private validateTextLength;
    /**
     * Limpia el texto antes de traducir
     * @param text - Texto a limpiar
     * @returns Texto limpio
     */
    private cleanText;
}
export default TranslationService;
//# sourceMappingURL=TranslationService.d.ts.map