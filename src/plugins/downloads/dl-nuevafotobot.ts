// dl-nuevafotobot.ts - Plugin mejorado y optimizado
// Categoría: downloads
// Funcionalidad: Descargas de contenido multimedia
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class dlnuevafotobotPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'nuevafotobot',
      category: 'downloads',
      description: 'Descargas de contenido multimedia',
      usage: 'nuevafotobot <parámetros>',
      aliases: [],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      const _0x2359c0 = _0x31ac;
          try {
              let _0x2538c6 = _0x14ced5[_0x2359c0(0x1c2)][_0x2359c0(0x1b2)]
                  , _0xf17176 = _0x55976e[_0x2359c0(0x1bb)] ? _0x55976e['quoted'] : _0x55976e;
              if (!_0x55976e[_0x2359c0(0x1bb)]) return _0x55976e.reply('🚩 Responde a una *Imagen.*')
              let _0x353a82 = (_0xf17176[_0x2359c0(0x1b1)] || _0xf17176)[_0x2359c0(0x1cf)] || '';
              var _0x434471 = await _0xf17176[_0x2359c0(0x1ba)]();
              let _0x3aeaf4 = await _0x2538c6;
              async function _0x4d2c5f(_0x2e4ee1) {
                  const _0x398c4c = _0x2359c0
                      , _0x5e6130 = await _0x29cf90[_0x398c4c(0x1c9)](_0x2e4ee1)
                      , _0x1347f7 = _0x5e6130[_0x398c4c(0x1b7)]() > _0x5e6130[_0x398c4c(0x1c4)]() ? _0x5e6130['resize'](0x2d0, _0x29cf90[_0x398c4c(0x1c1)]) : _0x5e6130[_0x398c4c(0x1be)](_0x29cf90[_0x398c4c(0x1c1)], 0x2d0)
                      , _0x17aa09 = await _0x29cf90[_0x398c4c(0x1c9)](await _0x1347f7[_0x398c4c(0x1c5)](_0x29cf90[_0x398c4c(0x1cb)]));
                  return {
                      'img': await _0x1347f7[_0x398c4c(0x1c5)](_0x29cf90[_0x398c4c(0x1cb)])
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new NuevafotobotPlugin();
  await plugin.execute({
    message: m,
    args: text?.split(' ') || [],
    reply: (msg: string) => conn.reply(m.chat, msg, m),
    conn,
    text,
    usedPrefix,
    command
  });
};

handler.command = ['nuevafotobot'];

export default handler;
