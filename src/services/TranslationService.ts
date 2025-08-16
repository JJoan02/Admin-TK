// src/services/TranslationService.ts - Servicio de traducción usando Google Translate

import translate from 'google-translate-api-x';
import { createModuleLogger } from '../utils/logger.js';

const moduleLogger = createModuleLogger('TranslationService');

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

export class TranslationService {
  private readonly logger = moduleLogger;
  private readonly supportedLanguages: SupportedLanguage[] = [
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'ko', name: 'Korean', nativeName: '한국어' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'th', name: 'Thai', nativeName: 'ไทย' },
    { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
    { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
    { code: 'pl', name: 'Polish', nativeName: 'Polski' },
    { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
    { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
    { code: 'da', name: 'Danish', nativeName: 'Dansk' },
    { code: 'no', name: 'Norwegian', nativeName: 'Norsk' }
  ];

  constructor() {
    this.logger.info('🌐 TranslationService inicializado');
  }

  /**
   * Traduce texto de un idioma a otro
   * @param text - Texto a traducir
   * @param langTo - Idioma de destino (código ISO)
   * @param langFrom - Idioma de origen (por defecto 'auto' para detección automática)
   * @returns Resultado de la traducción
   */
  public async translate(
    text: string, 
    langTo: string, 
    langFrom: string = 'auto'
  ): Promise<TranslationResult> {
    try {
      // Validar parámetros
      if (!text || text.trim().length === 0) {
        throw new Error('El texto a traducir no puede estar vacío');
      }

      if (!langTo || langTo.trim().length === 0) {
        throw new Error('El idioma de destino es requerido');
      }

      // Normalizar códigos de idioma
      const normalizedTo = this.normalizeLanguageCode(langTo);
      const normalizedFrom = langFrom === 'auto' ? 'auto' : this.normalizeLanguageCode(langFrom);

      // Validar que el idioma de destino sea soportado
      if (!this.isLanguageSupported(normalizedTo)) {
        throw new Error(`Idioma de destino no soportado: ${langTo}`);
      }

      // Validar que el idioma de origen sea soportado (si no es auto)
      if (normalizedFrom !== 'auto' && !this.isLanguageSupported(normalizedFrom)) {
        throw new Error(`Idioma de origen no soportado: ${langFrom}`);
      }

      this.logger.debug(`Traduciendo: "${text.substring(0, 50)}..." de ${normalizedFrom} a ${normalizedTo}`);

      // Realizar la traducción
      const result = await translate(text, { 
        from: normalizedFrom, 
        to: normalizedTo 
      });

      // Validar resultado
      if (!result || !result.text) {
        throw new Error('La API de traducción no devolvió un resultado válido');
      }

      this.logger.info(`✅ Traducción exitosa: ${normalizedFrom} → ${normalizedTo}`);

      return {
        text: result.text,
        from: {
          language: {
            didYouMean: result.from?.language?.didYouMean || false,
            iso: result.from?.language?.iso || normalizedFrom
          },
          text: {
            autoCorrected: result.from?.text?.autoCorrected || false,
            value: result.from?.text?.value || text,
            didYouMean: result.from?.text?.didYouMean || false
          }
        },
        raw: JSON.stringify(result)
      };

    } catch (error) {
      this.logger.error(`❌ Error en traducción: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      throw new Error(`Error de traducción: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  }

  /**
   * Detecta el idioma de un texto
   * @param text - Texto para detectar idioma
   * @returns Código ISO del idioma detectado
   */
  public async detectLanguage(text: string): Promise<string> {
    try {
      if (!text || text.trim().length === 0) {
        throw new Error('El texto para detectar idioma no puede estar vacío');
      }

      this.logger.debug(`Detectando idioma de: "${text.substring(0, 50)}..."`);

      const result = await translate(text, { from: 'auto', to: 'en' });
      const detectedLang = result.from?.language?.iso || 'unknown';

      this.logger.info(`🔍 Idioma detectado: ${detectedLang}`);
      return detectedLang;

    } catch (error) {
      this.logger.error(`❌ Error detectando idioma: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      throw new Error(`Error detectando idioma: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  }

  /**
   * Obtiene la lista de idiomas soportados
   * @returns Array de idiomas soportados
   */
  public getSupportedLanguages(): SupportedLanguage[] {
    return [...this.supportedLanguages];
  }

  /**
   * Verifica si un idioma es soportado
   * @param langCode - Código del idioma
   * @returns true si es soportado, false en caso contrario
   */
  public isLanguageSupported(langCode: string): boolean {
    const normalized = this.normalizeLanguageCode(langCode);
    return this.supportedLanguages.some(lang => lang.code === normalized);
  }

  /**
   * Obtiene información de un idioma por su código
   * @param langCode - Código del idioma
   * @returns Información del idioma o null si no se encuentra
   */
  public getLanguageInfo(langCode: string): SupportedLanguage | null {
    const normalized = this.normalizeLanguageCode(langCode);
    return this.supportedLanguages.find(lang => lang.code === normalized) || null;
  }

  /**
   * Traduce múltiples textos en lote
   * @param texts - Array de textos a traducir
   * @param langTo - Idioma de destino
   * @param langFrom - Idioma de origen (por defecto 'auto')
   * @returns Array de resultados de traducción
   */
  public async translateBatch(
    texts: string[], 
    langTo: string, 
    langFrom: string = 'auto'
  ): Promise<TranslationResult[]> {
    try {
      if (!Array.isArray(texts) || texts.length === 0) {
        throw new Error('Se requiere un array de textos no vacío');
      }

      this.logger.info(`📦 Traduciendo lote de ${texts.length} textos`);

      const results: TranslationResult[] = [];
      
      // Procesar en lotes pequeños para evitar límites de API
      const batchSize = 5;
      for (let i = 0; i < texts.length; i += batchSize) {
        const batch = texts.slice(i, i + batchSize);
        const batchPromises = batch.map(text => this.translate(text, langTo, langFrom));
        
        const batchResults = await Promise.allSettled(batchPromises);
        
        for (const result of batchResults) {
          if (result.status === 'fulfilled') {
            results.push(result.value);
          } else {
            // En caso de error, agregar un resultado de error
            results.push({
              text: '[Error de traducción]',
              from: {
                language: { didYouMean: false, iso: 'unknown' },
                text: { autoCorrected: false, value: '', didYouMean: false }
              },
              raw: JSON.stringify({ error: result.reason })
            });
          }
        }

        // Pequeña pausa entre lotes para evitar rate limiting
        if (i + batchSize < texts.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      this.logger.info(`✅ Lote completado: ${results.length} traducciones`);
      return results;

    } catch (error) {
      this.logger.error(`❌ Error en traducción por lotes: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      throw new Error(`Error en traducción por lotes: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  }

  /**
   * Obtiene estadísticas del servicio
   * @returns Estadísticas básicas
   */
  public getStats(): {
    supportedLanguages: number;
    isAvailable: boolean;
    version: string;
  } {
    return {
      supportedLanguages: this.supportedLanguages.length,
      isAvailable: true,
      version: '1.0.0'
    };
  }

  /**
   * Normaliza códigos de idioma a formato estándar
   * @param langCode - Código de idioma a normalizar
   * @returns Código normalizado
   */
  private normalizeLanguageCode(langCode: string): string {
    if (!langCode) return 'en';
    
    const normalized = langCode.toLowerCase().trim();
    
    // Mapeo de códigos alternativos
    const codeMap: Record<string, string> = {
      'spanish': 'es',
      'english': 'en',
      'french': 'fr',
      'german': 'de',
      'italian': 'it',
      'portuguese': 'pt',
      'russian': 'ru',
      'japanese': 'ja',
      'korean': 'ko',
      'chinese': 'zh',
      'arabic': 'ar',
      'hindi': 'hi',
      'thai': 'th',
      'vietnamese': 'vi',
      'turkish': 'tr',
      'polish': 'pl',
      'dutch': 'nl',
      'swedish': 'sv',
      'danish': 'da',
      'norwegian': 'no',
      // Códigos de 3 letras comunes
      'spa': 'es',
      'eng': 'en',
      'fra': 'fr',
      'deu': 'de',
      'ita': 'it',
      'por': 'pt',
      'rus': 'ru',
      'jpn': 'ja',
      'kor': 'ko',
      'zho': 'zh',
      'ara': 'ar',
      'hin': 'hi',
      'tha': 'th',
      'vie': 'vi',
      'tur': 'tr',
      'pol': 'pl',
      'nld': 'nl',
      'swe': 'sv',
      'dan': 'da',
      'nor': 'no'
    };

    return codeMap[normalized] || normalized;
  }

  /**
   * Valida que el texto no exceda límites razonables
   * @param text - Texto a validar
   * @returns true si es válido, false en caso contrario
   */
  private validateTextLength(text: string): boolean {
    const maxLength = 5000; // Límite razonable para traducción
    return text.length <= maxLength;
  }

  /**
   * Limpia el texto antes de traducir
   * @param text - Texto a limpiar
   * @returns Texto limpio
   */
  private cleanText(text: string): string {
    return text
      .trim()
      .replace(/\s+/g, ' ') // Normalizar espacios
      .replace(/[\r\n]+/g, '\n'); // Normalizar saltos de línea
  }
}

export default TranslationService;
