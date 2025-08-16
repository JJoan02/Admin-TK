// src/plugins/ai-chat/ai-llama.ts
// Plugin corregido para usar Groq AI de forma segura y funcional.

import { BasePlugin } from '../base/BasePlugin.js';
import Groq from 'groq-sdk';

// Se asume que un tipo de contexto está definido en algún lugar, ej: import { ICommandContext } from '../../types';

export class LlamaPlugin extends BasePlugin {
  private groq: Groq | null = null;

  constructor() {
    super({
      name: 'llama',
      category: 'ai-chat',
      description: 'Genera una respuesta usando el modelo LLaMA de Groq.',
      usage: 'llama <texto>',
      aliases: ['groq'],
      permissions: ['user'],
      cooldown: 5000, // 5 segundos
    });

    // Inicializar el cliente de Groq de forma segura
    if (process.env.GROQ_API_KEY) {
      this.groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    } else {
      console.warn('Advertencia: La API Key de Groq no está configurada en las variables de entorno (GROQ_API_KEY). El comando !llama no funcionará.');
    }
  }

  async execute(context: any): Promise<void> {
    const { args, reply } = context;

    if (!this.groq) {
      await reply('❌ El servicio de Groq AI no está configurado por el administrador.');
      return;
    }

    if (args.length === 0) {
      await reply('Por favor, escribe un texto para que pueda responderte.');
      return;
    }

    const question = args.join(' ');

    try {
      await reply('🧠 Pensando...'); // Feedback para el usuario

      const chatCompletion = await this.groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: question,
          },
        ],
        model: 'llama3-8b-8192', // Usar un modelo específico
      });

      const response = chatCompletion.choices[0]?.message?.content || 'No pude obtener una respuesta.';
      await reply(response);

    } catch (error) {
      console.error('Error en el plugin Llama:', error);
      await reply('❌ Ocurrió un error al contactar con la IA de Groq.');
    }
  }
}

// Exportar solo la clase para el nuevo sistema de plugins
export default LlamaPlugin;