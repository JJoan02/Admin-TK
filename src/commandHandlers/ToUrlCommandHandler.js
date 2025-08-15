// src/commandHandlers/ToUrlCommandHandler.js

import fs from 'fs';
import path from 'path';
import axios from 'axios';
import FormData from 'form-data';
import { fileTypeFromBuffer } from 'file-type';
import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();

class ToUrlCommandHandler {
  async handle(command) {
    const { context } = command;
    const { sock, message, reply } = context;

    const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quotedMessage) {
      return reply('⚠️ Debes responder a un archivo multimedia para usar este comando.');
    }

    try {
      await sock.sendMessage(message.key.remoteJid, { react: { text: '⏳', key: message.key } });

      const mediaBuffer = await sock.downloadMediaMessage(quotedMessage);
      if (!mediaBuffer) {
        return reply('❌ No se pudo descargar el archivo.');
      }

      const [supa, freehost] = await Promise.all([
        this.uploadToSupa(mediaBuffer),
        this.uploadToFreeImageHost(mediaBuffer),
      ]);

      let responseText = '✅ Se subió el archivo a los siguientes servicios:\n';
      if (supa) responseText += `\n*Supa:* ${supa}`;
      if (freehost) responseText += `\n*FreeImage.Host:* ${freehost}`;

      if (!supa && !freehost) {
        responseText = '❌ Lo siento, no se pudo subir el archivo a ningún servicio.';
      }

      await reply(responseText.trim());
      await sock.sendMessage(message.key.remoteJid, { react: { text: '✅', key: message.key } });

    } catch (error) {
      logger.error({ err: error }, '❌ Error al procesar la subida de archivos.');
      reply('❌ Ocurrió un error inesperado al subir el archivo.');
    }
  }

  async uploadToSupa(buffer) {
    try {
      const form = new FormData();
      form.append('file', buffer, 'upload.jpg');
      const res = await axios.post('https://i.supa.codes/api/upload', form, {
        headers: form.getHeaders(),
      });
      return res.data?.link || null;
    } catch (err) {
      logger.error({ err: err?.response?.data || err.message }, 'Supa Upload Error');
      return null;
    }
  }

  async uploadToFreeImageHost(buffer) {
    try {
      const form = new FormData();
      form.append('source', buffer.toString('base64'));
      const res = await axios.post('https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5', form, {
        headers: form.getHeaders(),
      });
      return res.data.image.url;
    } catch (err) {
      logger.error({ err: err?.response?.data || err.message }, 'FreeImageHost Upload Error');
      return null;
    }
  }
}

export default ToUrlCommandHandler;
