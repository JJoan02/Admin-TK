import dotenv from 'dotenv';
dotenv.config();

import Joi from 'joi';

// Función auxiliar para parsear números de teléfono desde una cadena separada por comas
const parsePhoneNumbers = (envVar, defaultValue = []) => {
  if (!envVar) return defaultValue;
  return envVar.split(',').map(num => num.trim()).filter(num => num.length > 0);
};

const configSchema = Joi.object({
  prefix: Joi.string().default('.'),
  botName: Joi.string().default('Admin-TK'),
  botNumber: Joi.string().pattern(/^\d+$/).required().messages({
    'string.pattern.base': 'botNumber debe contener solo dígitos.',
    'string.empty': 'botNumber no puede estar vacío.',
    'any.required': 'botNumber es requerido.',
  }),
  ownerNumbers: Joi.array().items(Joi.string().pattern(/^\d+$/)).min(1).required().messages({
    'array.min': 'ownerNumbers debe contener al menos un número de propietario.',
    'string.pattern.base': 'Los números de propietario deben contener solo dígitos.',
    'array.includesRequiredUnknowns': 'Los números de propietario son requeridos.',
  }),
  skipBackupMenu: Joi.boolean().default(false), // NUEVO: Para controlar si se muestra el menú de backup
  roles: Joi.object({
    USER: Joi.string().default('user'),
    GROUP_ADMIN: Joi.string().default('group_admin'),
    OWNER: Joi.string().default('owner'),
    BOT: Joi.string().default('bot'),
  }).required(),
  rolePermissions: Joi.object().pattern(Joi.string(), Joi.array().items(Joi.string())).required(),
  database: Joi.object({
    type: Joi.string().valid('MongoDB', 'LowDB', 'SQLite').default('SQLite'),
    sqlite: Joi.object({
      filename: Joi.string().default('database.sqlite'),
    }).when('type', {
      is: 'SQLite',
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
    lowdb: Joi.object({
      path: Joi.string().default('database.json'),
    }).when('type', {
      is: 'LowDB',
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
    mongoUri: Joi.string().when('type', {
      is: 'MongoDB',
      then: Joi.required().messages({
        'string.empty': 'mongoUri no puede estar vacío para MongoDB.',
        'any.required': 'mongoUri es requerido para MongoDB.',
      }),
      otherwise: Joi.forbidden(),
    }),
  }).required(),
  googleDrive: Joi.object({
    backupFolderId: Joi.string().allow('').default(''),
    credentialsPath: Joi.string().default('credentials.json'),
    tokenPath: Joi.string().default('gdrive_token.json'),
  }).required(),
  api: Joi.object({
    ocr: Joi.string().allow(null).default(null),
    removeBg: Joi.string().allow(null).default(null),
    geminiApiKey: Joi.string().allow(null).default(null), // Permitir null si no es requerido
    pexelsApiKey: Joi.string().allow(null).default(null),
    lolhuman: Joi.object({
      url: Joi.string().uri().default('https://api.lolhuman.xyz/api'),
      key: Joi.string().default('GataDios'),
    }).required(),
    stellar: Joi.object({
      url: Joi.string().uri().default('https://api.stellarwa.xyz'),
      key: Joi.string().default('Stellar'),
    }).required(),
    skizo: Joi.object({
      url: Joi.string().uri().default('https://skizo.tech/api'),
      key: Joi.string().default('GataDios'),
    }).required(),
    alyachan: Joi.object({
      url: Joi.string().uri().default('https://api.alyachan.dev/api'),
      key: Joi.string().allow(null).default(null),
    }).required(),
    exonity: Joi.object({
      url: Joi.string().uri().default('https://exonity.tech/api'),
      key: Joi.string().default('GataDios'),
    }).required(),
    ryzendesu: Joi.object({
      url: Joi.string().uri().default('https://api.ryzendesu.vip/api'),
      key: Joi.string().allow(null).default(null),
    }).required(),
    neoxr: Joi.object({
      url: Joi.string().uri().default('https://api.neoxr.eu/api'),
      key: Joi.string().default('GataDios'),
    }).required(),
    davidcyriltech: Joi.object({
      url: Joi.string().uri().default('https://api.davidcyriltech.my.id'),
      key: Joi.string().allow(null).default(null),
    }).required(),
    dorratz: Joi.object({
      url: Joi.string().uri().default('https://api.dorratz.com'),
      key: Joi.string().allow(null).default(null),
    }).required(),
    siputzx: Joi.object({
      url: Joi.string().uri().default('https://api.siputzx.my.id/api'),
      key: Joi.string().allow(null).default(null),
    }).required(),
    vreden: Joi.object({
      url: Joi.string().uri().default('https://api.vreden.web.id/api'),
      key: Joi.string().allow(null).default(null),
    }).required(),
    fgmods: Joi.object({
      url: Joi.string().uri().default('https://api.fgmods.xyz/api'),
      key: Joi.string().default('elrebelde21'),
    }).required(),
    popcat: Joi.object({
      url: Joi.string().uri().default('https://api.popcat.xyz'),
      key: Joi.string().allow(null).default(null),
    }).required(),
    cloudinary: Joi.object({
      cloudName: Joi.string().allow(null).default(null),
      apiKey: Joi.string().allow(null).default(null),
      apiSecret: Joi.string().allow(null).default(null),
    }).required(),
  }).required(), // Eliminado el paréntesis extra aquí
  logger: Joi.object({
    level: Joi.string().valid('fatal', 'error', 'warn', 'info', 'debug', 'trace').default('info'),
    rotateLogs: Joi.boolean().default(false),
    logFile: Joi.string().default('logs/bot.log'),
    logFrequency: Joi.string().default('daily'),
    logSize: Joi.string().default('10m'),
    logMaxHistory: Joi.string().default('7d'),
    logCompress: Joi.boolean().default(true),
  }).required(),
  session: Joi.object({
    id: Joi.string().default('admin_tk_session'),
  }).required(),
});

const config = {
  prefix: process.env.BOT_PREFIX || '.', // Usar BOT_PREFIX del .env o el default
  botName: process.env.BOT_NAME || 'Admin-TK', // Usar BOT_NAME del .env o el default
  botNumber: process.env.BOT_WHATSAPP_NUMBER, // Usar BOT_WHATSAPP_NUMBER del .env
  ownerNumbers: parsePhoneNumbers(process.env.OWNER_WHATSAPP_NUMBER), // Usar OWNER_WHATSAPP_NUMBER del .env
  skipBackupMenu: process.env.SKIP_BACKUP_MENU === 'true', // Leer de .env
  roles: {
    USER: 'user',
    GROUP_ADMIN: 'group_admin',
    OWNER: 'owner',
    BOT: 'bot',
  },
  rolePermissions: {
    user: [
      'menu', 'ping', 'ia',
    ],
    group_admin: [
      'menu', 'ping', 'ia', 'add',
    ],
    owner: [
      'menu', 'ping', 'ia', 'add', 'ia-aprender', 'ia-personalidad', 'ia-reset-personalidad',
    ],
    bot: [],
  },
  database: (() => {
    const dbConfig = {
      type: process.env.DB_TYPE || 'SQLite', // Usar DB_TYPE del .env o el default
    };
    switch (dbConfig.type) {
      case 'SQLite':
        dbConfig.sqlite = { filename: process.env.DB_PATH || 'database.sqlite' }; // Usar DB_PATH del .env o el default
        break;
      case 'LowDB':
        dbConfig.lowdb = { path: process.env.LOWDB_PATH || 'database.json' };
        break;
      case 'MongoDB':
        dbConfig.mongoUri = process.env.MONGO_URI;
        break;
    }
    return dbConfig;
  })(),
  googleDrive: {
    backupFolderId: process.env.GOOGLE_DRIVE_BACKUP_FOLDER_ID,
    credentialsPath: process.env.GOOGLE_DRIVE_CREDENTIALS_PATH || 'credentials.json', // Leer de .env o usar default
    tokenPath: process.env.GOOGLE_DRIVE_TOKEN_PATH || 'gdrive_token.json', // Leer de .env o usar default
  },
  api: {
    ocr: process.env.OCR_API_KEY || null,
    removeBg: process.env.REMOVE_BG_API_KEY || null,
    geminiApiKey: process.env.GEMINI_API_KEY || null, // Leer de .env
    pexelsApiKey: process.env.PEXELS_API_KEY || null,
    lolhuman: {
      url: process.env.LOLHUMAN_URL || 'https://api.lolhuman.xyz/api',
      key: process.env.LOLHUMAN_KEY || 'GataDios',
    },
    stellar: {
      url: process.env.STELLAR_URL || 'https://api.stellarwa.xyz',
      key: process.env.STELLAR_KEY || 'Stellar',
    },
    skizo: {
      url: process.env.SKIZO_URL || 'https://skizo.tech/api',
      key: process.env.SKIZO_KEY || 'GataDios',
    },
    alyachan: {
      url: process.env.ALYACHAN_URL || 'https://api.alyachan.dev/api',
      key: process.env.ALYACHAN_KEY || null,
    },
    exonity: {
      url: process.env.EXONITY_URL || 'https://exonity.tech/api',
      key: process.env.EXONITY_KEY || 'GataDios',
    },
    ryzendesu: {
      url: process.env.RYZENDESU_URL || 'https://api.ryzendesu.vip/api',
      key: process.env.RYZENDESU_KEY || null,
    },
    neoxr: {
      url: process.env.NEOXR_URL || 'https://api.neoxr.eu/api',
      key: process.env.NEOXR_KEY || 'GataDios',
    },
    davidcyriltech: {
      url: process.env.DAVIDCYRILTECH_URL || 'https://api.davidcyriltech.my.id',
      key: process.env.DAVIDCYRILTECH_KEY || null,
    },
    dorratz: {
      url: process.env.DORRATZ_URL || 'https://api.dorratz.com',
      key: process.env.DORRATZ_KEY || null,
    },
    siputzx: {
      url: process.env.SIPUTZX_URL || 'https://api.siputzx.my.id/api',
      key: process.env.SIPUTZX_KEY || null,
    },
    vreden: {
      url: process.env.VREDEN_URL || 'https://api.vreden.web.id/api',
      key: process.env.VREDEN_KEY || null,
    },
    fgmods: {
      url: process.env.FGMODS_URL || 'https://api.fgmods.xyz/api',
      key: process.env.FGMODS_KEY || 'elrebelde21',
    },
    popcat: {
      url: process.env.POPCAT_URL || 'https://api.popcat.xyz',
      key: process.env.POPCAT_KEY || null,
    },
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME || null,
      apiKey: process.env.CLOUDINARY_API_KEY || null,
      apiSecret: process.env.CLOUDINARY_API_SECRET || null,
    },
  }).required(),
  logger: Joi.object({
    level: Joi.string().valid('fatal', 'error', 'warn', 'info', 'debug', 'trace').default('info'),
    rotateLogs: Joi.boolean().default(false),
    logFile: Joi.string().default('logs/bot.log'),
    logFrequency: Joi.string().default('daily'),
    logSize: Joi.string().default('10m'),
    logMaxHistory: Joi.string().default('7d'),
    logCompress: Joi.boolean().default(true),
  }).required(),
  session: Joi.object({
    id: Joi.string().default('admin_tk_session'),
  }).required(),
});

const { error, value: validatedConfig } = configSchema.validate(config, { abortEarly: false, allowUnknown: true });

if (error) {
  throw new Error(`Errores de validación de configuración: ${error.details.map(x => x.message).join(', ')}`);
}

export default Object.freeze(validatedConfig);