import fs from 'fs';
import path from 'path';
export class LanguageService {
    static instance;
    languages = new Map();
    config;
    languagesDir;
    constructor(config) {
        this.config = config.config;
        this.languagesDir = config.languagesDir;
        this.loadLanguages();
    }
    static getInstance(config) {
        if (!LanguageService.instance && config) {
            LanguageService.instance = new LanguageService(config);
        }
        return LanguageService.instance;
    }
    loadLanguages() {
        try {
            const languagesPath = path.resolve(this.languagesDir);
            if (!fs.existsSync(languagesPath)) {
                console.warn(`Directory ${languagesPath} does not exist`);
                return;
            }
            const files = fs.readdirSync(languagesPath);
            for (const file of files) {
                if (file.endsWith('.json')) {
                    const languageCode = path.basename(file, '.json');
                    const filePath = path.join(languagesPath, file);
                    try {
                        const content = fs.readFileSync(filePath, 'utf-8');
                        const translations = JSON.parse(content);
                        this.languages.set(languageCode, translations);
                    }
                    catch (error) {
                        console.error(`Error loading language file ${file}:`, error);
                    }
                }
            }
        }
        catch (error) {
            console.error('Error loading languages:', error);
        }
    }
    getTranslation(languageCode, key, ...args) {
        const language = this.languages.get(languageCode) ||
            this.languages.get(this.config.fallbackLanguage);
        if (!language) {
            return key;
        }
        const translation = this.getNestedValue(language, key);
        if (!translation) {
            console.warn(`Translation missing for key: ${key} in language: ${languageCode}`);
            return key;
        }
        if (typeof translation === 'function') {
            return translation(...args);
        }
        if (typeof translation === 'string') {
            return this.processTemplate(translation, args);
        }
        return String(translation);
    }
    getAvailableLanguages() {
        return Array.from(this.languages.keys());
    }
    isLanguageSupported(languageCode) {
        return this.languages.has(languageCode);
    }
    getDefaultLanguage() {
        return this.config.defaultLanguage;
    }
    getFallbackLanguage() {
        return this.config.fallbackLanguage;
    }
    reloadLanguages() {
        this.languages.clear();
        this.loadLanguages();
    }
    validateTranslations() {
        const result = {
            missingKeys: [],
            invalidKeys: [],
            totalKeys: 0,
            languages: {}
        };
        const referenceLanguage = this.languages.get(this.config.defaultLanguage);
        if (!referenceLanguage) {
            return result;
        }
        const referenceKeys = this.getAllKeys(referenceLanguage);
        result.totalKeys = referenceKeys.length;
        for (const [langCode, translations] of this.languages) {
            const langKeys = this.getAllKeys(translations);
            const missing = referenceKeys.filter(key => !langKeys.includes(key));
            result.languages[langCode] = {
                totalKeys: langKeys.length,
                missingKeys: missing,
                coverage: (langKeys.length / referenceKeys.length) * 100
            };
            if (missing.length > 0) {
                result.missingKeys.push(...missing.map(key => ({ language: langCode, key })));
            }
        }
        return result;
    }
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }
    getAllKeys(obj, prefix = '') {
        let keys = [];
        for (const key in obj) {
            const fullKey = prefix ? `${prefix}.${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                keys = keys.concat(this.getAllKeys(obj[key], fullKey));
            }
            else {
                keys.push(fullKey);
            }
        }
        return keys;
    }
    processTemplate(template, args) {
        return template.replace(/\{(\d+)\}/g, (match, index) => {
            const argIndex = parseInt(index);
            return args[argIndex] !== undefined ? String(args[argIndex]) : match;
        });
    }
}
export const defaultLanguageConfig = {
    defaultLanguage: 'es',
    supportedLanguages: ['es', 'en', 'id', 'ar', 'pt', 'fr', 'hi'],
    fallbackLanguage: 'es'
};
export const createLanguageService = (languagesDir = './src/languages') => {
    return LanguageService.getInstance({
        languagesDir,
        config: defaultLanguageConfig
    });
};
//# sourceMappingURL=LanguageService.js.map