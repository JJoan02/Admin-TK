// src/services/ContextualMemoryService.js

import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();

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
      const prompt = `Analiza el siguiente texto y extrae hechos, entidades o relaciones clave en formato JSON. El formato debe ser un array de objetos, donde cada objeto tiene "key" (una clave corta en snake_case) y "value". Ejemplo: si el texto es "a Juan le gusta el helado de chocolate y su perro se llama Firulais", el resultado debería ser: [{"key": "gusto_juan", "value": "helado de chocolate"}, {"key": "perro_juan", "value": "Firulais"}]. Ignora saludos, opiniones o texto irrelevante. Solo extrae información concreta y objetiva. Si no hay hechos concretos, devuelve un array vacío []. Texto a analizar: "${text}"`;

      // Usamos el AIService para generar la extracción
      const factsString = await this.aiService.generateRawText(prompt, 0.2, 500);

      if (!factsString || !factsString.includes('{')) return;

      // Limpiar la respuesta del LLM para asegurar que sea un JSON válido
      const cleanedString = factsString.replace(/```json|```/g, '').trim();
      const facts = JSON.parse(cleanedString);

      if (Array.isArray(facts) && facts.length > 0) {
        logger.info(`🧠 Hechos extraídos de ${chatId}: ${JSON.stringify(facts)}`);
        for (const fact of facts) {
          // Validar que el hecho tenga el formato correcto antes de guardar
          if (fact.key && fact.value) {
            await this.memoryService.saveFact(chatId, fact.key, fact.value, userId);
          }
        }
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        logger.warn(`ContextualMemoryService: La IA no devolvió un JSON válido para el texto: "${text}"`);
      } else {
        logger.error({ err: error }, 'Error en ContextualMemoryService');
      }
    }
  }
}

export default ContextualMemoryService;
