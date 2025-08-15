export interface TranslationKey {
    [key: string]: string | (() => string) | ((...args: any[]) => string);
}
export interface LanguagePack {
    [key: string]: TranslationKey;
}
export interface LanguageConfig {
    defaultLanguage: string;
    supportedLanguages: string[];
    fallbackLanguage: string;
}
export interface LanguageServiceConfig {
    languagesDir: string;
    config: LanguageConfig;
}
export declare class LanguageService {
    private static instance;
    private languages;
    private config;
    private languagesDir;
    private constructor();
    static getInstance(config?: LanguageServiceConfig): LanguageService;
    private loadLanguages;
    getTranslation(languageCode: string, key: string, ...args: any[]): string;
    getAvailableLanguages(): string[];
    isLanguageSupported(languageCode: string): boolean;
    getDefaultLanguage(): string;
    getFallbackLanguage(): string;
    reloadLanguages(): void;
    validateTranslations(): ValidationResult;
    private getNestedValue;
    private getAllKeys;
    private processTemplate;
}
export interface ValidationResult {
    missingKeys: Array<{
        language: string;
        key: string;
    }>;
    invalidKeys: string[];
    totalKeys: number;
    languages: {
        [languageCode: string]: {
            totalKeys: number;
            missingKeys: string[];
            coverage: number;
        };
    };
}
export declare const defaultLanguageConfig: LanguageConfig;
export declare const createLanguageService: (languagesDir?: string) => LanguageService;
//# sourceMappingURL=LanguageService.d.ts.map