// src/services/ContextualMemoryService.js
import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();
// AIService y MemoryService se inyectan en el constructor de MessageHandler
// y luego se pasan a ContextualMemoryService.
export class ContextualMemoryService {
    constructor(aiService, memoryService) {
        this.aiService = aiService;
        this.memoryService = memoryService;
    }
    /**
     * Analiza un mensaje de forma pasiva para extraer hechos y los guarda.
     * @param {string} text - El contenido del mensaje.
     * @param {string} chatId - El ID del chat.
     * @param {string} userId - El ID del usuario que envió el mensaje.
     */
    async analyzeAndStore(text, chatId, userId) {
        try {
            const prompt = `Analiza el siguiente texto y extrae hechos, entidades o relaciones clave en formato JSON. El formato debe ser un array de objetos, donde cada objeto tiene \"key\" (una clave corta en snake_case) y \"value\". Ejemplo: si el texto es \"a Juan le gusta el helado de chocolate y su perro se llama Firulais\", el resultado debería ser: [{\"key\": \"gusto_juan\", \"value\": \"helado de chocolate\"}, {\"key\": \"perro_juan\", \"value\": \"Firulais\"}]. Ignora saludos, opiniones o texto irrelevante. Solo extrae información concreta y objetiva. Si no hay hechos concretos, devuelve un array vacío []. Texto a analizar: \"${text}\"`;
            // Usamos el AIService para generar la extracción
            const factsString = await this.aiService.generateRawText(prompt, 0.2, 500);
            if (!factsString) {
                logger.debug('IA: generateRawText no devolvió ninguna cadena.');
                return;
            }
            // Intentar extraer el JSON de la cadena, incluso si hay texto adicional
            const jsonMatch = factsString.match(/```json\n([\s\S]*?)\n```/);
            let jsonToParse = factsString;
            if (jsonMatch && jsonMatch[1]) {
                jsonToParse = jsonMatch[1];
            }
            let facts = [];
            try {
                facts = JSON.parse(jsonToParse);
                if (!Array.isArray(facts)) {
                    logger.warn(`IA: La respuesta del LLM no es un array JSON válido: ${jsonToParse.substring(0, 100)}...`);
                    return;
                }
            }
            catch (parseError) {
                logger.error({ err: parseError, raw: factsString, parsed: jsonToParse }, '❌ IA: Error al parsear JSON de hechos del LLM.');
                return;
            }
            for (const fact of facts) {
                // Validar que el hecho tenga el formato correcto y no esté vacío
                if (typeof fact.key === 'string' && fact.key.trim() !== '' &&
                    typeof fact.value === 'string' && fact.value.trim() !== '') {
                    await this.memoryService.saveFact(chatId, fact.key.trim(), fact.value.trim(), userId);
                    logger.debug(`IA: Hecho contextual guardado para ${chatId}: ${fact.key} = ${fact.value}`);
                }
                else {
                    logger.warn(`IA: Hecho inválido o vacío detectado y omitido: ${JSON.stringify(fact)}`);
                }
            }
        }
        catch (error) {
            logger.error({ err: error, text, chatId, userId }, '❌ IA: Error en analyzeAndStore.');
        }
    }
}
export default ContextualMemoryService;
//# sourceMappingURL=ContextualMemoryService.js.map