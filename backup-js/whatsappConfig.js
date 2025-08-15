import { Browsers } from '@whiskeysockets/baileys';
import Joi from 'joi';

const whatsappConfigSchema = Joi.object({
  browserName: Joi.string().default('Admin-TK'),
  qrTimeout: Joi.number().integer().min(1000).default(60000),
  reconnect: Joi.boolean().default(true),
  proxy: Joi.string().uri().allow(null).default(null),
  reconnectTimeout: Joi.number().integer().min(1000).default(5000),
});

const { error, value: validatedWhatsappConfig } = whatsappConfigSchema.validate({
  browserName: process.env.BROWSER_NAME,
  qrTimeout: process.env.QR_TIMEOUT ? parseInt(process.env.QR_TIMEOUT, 10) : undefined,
  reconnect: process.env.RECONNECT ? process.env.RECONNECT === 'true' : undefined,
  proxy: process.env.WHATSAPP_PROXY_URL || null,
  reconnectTimeout: process.env.RECONNECT_TIMEOUT ? parseInt(process.env.RECONNECT_TIMEOUT, 10) : undefined,
}, { abortEarly: false, allowUnknown: true });

if (error) {
  throw new Error(`Errores de validación de whatsappConfig: ${error.details.map(x => x.message).join(', ')}`);
}

const whatsappConfig = {
  browser: Browsers.macOS(validatedWhatsappConfig.browserName),
  qrTimeout: validatedWhatsappConfig.qrTimeout,
  reconnect: validatedWhatsappConfig.reconnect,
  proxy: validatedWhatsappConfig.proxy,
  reconnectTimeout: validatedWhatsappConfig.reconnectTimeout,
};

export default Object.freeze(whatsappConfig);
