// src/commandHandlers/ToImageCommandHandler.js

import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();
import { toWebp, toMp4, extractFrame } from '../lib/media.js';
import { getContentType } from '@whiskeysockets/baileys';

class ToImageCommandHandler {
  async handle(command) {
    const { context } = command;
    const { sock, message, reply } = context;

    const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quotedMessage) {
      return reply('⚠️ Debes responder a un sticker para usar este comando.');
    }

    const mime = getContentType(quotedMessage);
    if (!/sticker/.test(mime)) {
      return reply('⚠️ El mensaje al que respondes no es un sticker.');
    }

    try {
      const mediaBuffer = await sock.downloadMediaMessage(quotedMessage);
      if (!mediaBuffer) {
        return reply('❌ No se pudo descargar el sticker.');
      }

      let outputBuffer;
      if (mime === 'stickerMessage' && quotedMessage.stickerMessage?.isAnimated) {
        const mp4Buffer = await toMp4(mediaBuffer, 'webp');
        if (mp4Buffer) {
          outputBuffer = await extractFrame(mp4Buffer, 0);
        } else {
          return reply('❌ No se pudo convertir el sticker animado a imagen.');
        }
      } else {
        outputBuffer = await toWebp(mediaBuffer, 'webp', false);
      }

      if (outputBuffer) {
        await sock.sendMessage(context.chat.id, { image: outputBuffer, mimetype: 'image/png' });
      } else {
        reply('❌ Ocurrió un error al convertir el sticker a imagen.');
      }
    } catch (error) {
      logger.error({ err: error }, '❌ Error al procesar la conversión de sticker a imagen.');
      reply('❌ Ocurrió un error inesperado al convertir el sticker a imagen.');
    }
  }
}

export default ToImageCommandHandler;
