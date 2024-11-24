// =======================================
// CONFIGURACIONES INICIALES Y MÓDULOS
// =======================================
import './config.js';

import path, { join } from 'path';
import { platform } from 'process';
import { fileURLToPath, pathToFileURL } from 'url';
import { createRequire } from 'module';
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch,
} from 'fs';
import yargs from 'yargs';
import { spawn } from 'child_process';
import lodash from 'lodash';
import syntaxerror from 'syntax-error';
import chalk from 'chalk';
import readline from 'readline';
import { format } from 'util';
import pino from 'pino';
import { tmpdir } from 'os';
import ws from 'ws';

import pkg from '@adiwajshing/baileys'; // Importar el paquete correcto
const {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeInMemoryStore,
  makeCacheableSignalKeyStore,
  PHONENUMBER_MCC,
} = pkg;

import { Low, JSONFile } from 'lowdb';
import { makeWASocket, protoType, serialize } from './lib/simple.js';
import cloudDBAdapter from './lib/cloudDBAdapter.js';
import { mongoDB, mongoDBV2 } from './lib/mongoDB.js';

const { CONNECTING } = ws;
const { chain } = lodash;
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;

protoType();
serialize();

global.__filename = function filename(
  pathURL = import.meta.url,
  rmPrefix = platform !== 'win32'
) {
  return rmPrefix
    ? pathURL.startsWith('file://')
      ? fileURLToPath(pathURL)
      : pathURL
    : pathToFileURL(pathURL).toString();
};
global.__dirname = function dirname(pathURL) {
  return path.dirname(global.__filename(pathURL, true));
};
global.__require = function require(dir = import.meta.url) {
  return createRequire(dir);
};

global.API = (name, path = '/', query = {}, apikeyqueryname) =>
  (name in global.APIs ? global.APIs[name] : name) +
  path +
  (query || apikeyqueryname
    ? '?' +
      new URLSearchParams(
        Object.entries({
          ...query,
          ...(apikeyqueryname
            ? {
                [apikeyqueryname]:
                  global.APIKeys[
                    name in global.APIs ? global.APIs[name] : name
                  ],
              }
            : {}),
        })
      )
    : '');
// global.Fn = function functionCallBack(fn, ...args) { return fn.call(global.conn, ...args) }
global.timestamp = {
  start: new Date(),
};

const __dirname = global.__dirname(import.meta.url);

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
global.prefix = new RegExp(
  '^[' +
    (opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(
      /[|\\{}()[\]^$+*?.\-\^]/g,
      '\\$&'
    ) +
    ']'
);

// =======================================
// CONFIGURACIÓN DE LA BASE DE DATOS
// =======================================
global.db = new Low(
  /https?:\/\//.test(opts['db'] || '')
    ? new cloudDBAdapter(opts['db'])
    : /mongodb(\+srv)?:\/\//i.test(opts['db'])
    ? opts['mongodbv2']
      ? new mongoDBV2(opts['db'])
      : new mongoDB(opts['db'])
    : new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`)
);
global.DATABASE = global.db; // Compatibilidad hacia atrás
global.loadDatabase = async function loadDatabase() {
  if (db.READ)
    return new Promise((resolve) =>
      setInterval(async function () {
        if (!db.READ) {
          clearInterval(this);
          resolve(db.data == null ? global.loadDatabase() : db.data);
        }
      }, 1 * 1000)
    );
  if (db.data !== null) return;
  db.READ = true;
  await db.read().catch(console.error);
  db.READ = null;
  db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(db.data || {}),
  };
  global.db.chain = chain(db.data);
};
loadDatabase();

// =======================================
// CONFIGURACIÓN DE CONEXIÓN Y VINCULACIÓN
// =======================================
const usePairingCode = true; // Usar siempre el código de emparejamiento de 8 dígitos
const useMobile = process.argv.includes('--mobile');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = function (text) {
  return new Promise(function (resolve) {
    rl.question(text, resolve);
  });
};

const { version, isLatest } = await fetchLatestBaileysVersion();
const { state, saveCreds } = await useMultiFileAuthState('./sessions');

const store = makeInMemoryStore({
  logger: pino().child({ level: 'silent', stream: 'store' }),
});
store.readFromFile('./baileys_store.json');
setInterval(() => {
  store.writeToFile('./baileys_store.json');
}, 10_000);

const connectionOptions = {
  version,
  logger: pino({ level: 'silent' }),
  printQRInTerminal: false, // No imprimir QR
  browser: ['Admin-TK', 'Chrome', '1.0.0'],
  auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(
      state.keys,
      pino().child({
        level: 'silent',
        stream: 'store',
      })
    ),
  },
  getMessage: async (key) => {
    const messageData = await store.loadMessage(key.remoteJid, key.id);
    return messageData?.message || undefined;
  },
  generateHighQualityLinkPreview: true,
  patchMessageBeforeSending: (message) => {
    const requiresPatch = !!(
      message.buttonsMessage ||
      message.templateMessage ||
      message.listMessage
    );
    if (requiresPatch) {
      message = {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadataVersion: 2,
              deviceListMetadata: {},
            },
            ...message,
          },
        },
      };
    }

    return message;
  },
  connectTimeoutMs: 60000,
  defaultQueryTimeoutMs: 0,
  syncFullHistory: true,
  markOnlineOnConnect: true,
};

global.conn = makeWASocket(connectionOptions);
conn.isInit = false;

// Solicitud de código de emparejamiento
if (usePairingCode && !conn.authState.creds.registered) {
  const phoneNumber = await question(
    chalk.blue(
      '📱 Ingresa el número de WhatsApp en el cual estará el Bot (con código de país, sin +): '
    )
  );
  rl.close();

  if (conn.requestPairingCode) {
    let code = await conn.requestPairingCode(phoneNumber);
    code = code?.match(/.{1,4}/g)?.join('-') || code;
    console.log(chalk.greenBright(`🔑 Tu código de emparejamiento es: ${code}`));
  } else {
    console.error('❌ La función requestPairingCode no está disponible.');
  }
}

// Iniciar servidor y limpieza automática
if (!opts['test']) {
  (await import('./server.js')).default(PORT);
  setInterval(async () => {
    if (global.db.data) await global.db.write().catch(console.error);
    clearTmp();
    console.log(chalk.yellow('🧹 Limpieza automática realizada.'));
  }, 60 * 1000); // Limpieza cada minuto
}

// Resetear límites automáticamente
async function resetLimit() {
  try {
    let list = Object.entries(global.db.data.users);
    let lim = 25; // Valor de límite predeterminado

    list.forEach(([user, data]) => {
      if (data.limit <= lim) {
        data.limit = lim;
      }
    });

    console.log(chalk.green('🔄 Límite de usuarios restablecido automáticamente.'));
  } finally {
    setInterval(() => resetLimit(), 1 * 86400000); // Cada 24 horas
  }
}
resetLimit();

// Función de limpieza de archivos temporales
function clearTmp() {
  const tmp = [tmpdir(), join(__dirname, './tmp')];
  const filename = [];
  tmp.forEach((dirname) =>
    readdirSync(dirname).forEach((file) => filename.push(join(dirname, file)))
  );
  return filename.map((file) => {
    const stats = statSync(file);
    if (
      stats.isFile() &&
      Date.now() - stats.mtimeMs >= 1000 * 60 // Archivos de más de 1 minuto
    ) {
      unlinkSync(file);
      console.log(chalk.yellow(`🗑️ Archivo temporal eliminado: ${file}`));
      return true;
    }
    return false;
  });
}

// Función para limpiar sesiones antiguas
async function clearSessions(folder = './sessions') {
  try {
    const filenames = await readdirSync(folder);
    const deletedFiles = await Promise.all(
      filenames.map(async (file) => {
        try {
          const filePath = path.join(folder, file);
          const stats = await statSync(filePath);
          if (stats.isFile() && file !== 'creds.json') {
            await unlinkSync(filePath);
            console.log(chalk.red(`🗑️ Sesión eliminada: ${filePath}`));
            return filePath;
          }
        } catch (err) {
          console.error(chalk.red(`❌ Error al procesar ${file}: ${err.message}`));
        }
      })
    );
    return deletedFiles.filter((file) => file !== null);
  } catch (err) {
    console.error(chalk.red(`❌ Error en Clear Sessions: ${err.message}`));
    return [];
  } finally {
    setTimeout(() => clearSessions(folder), 1 * 3600000); // Cada 1 hora
  }
}
clearSessions();

// Manejo de eventos de conexión
async function connectionUpdate(update) {
  const {
    receivedPendingNotifications,
    connection,
    lastDisconnect,
    isOnline,
    isNewLogin,
  } = update;

  if (isNewLogin) {
    conn.isInit = true;
  }

  if (connection === 'connecting') {
    console.log(
      chalk.blueBright('🔌 Conectando Admin-TK, por favor espera un momento...')
    );
  } else if (connection === 'open') {
    console.log(chalk.green('✅ Admin-TK conectado exitosamente.'));
  }

  if (isOnline === true) {
    console.log(chalk.green('🌐 Admin-TK está en línea.'));
  } else if (isOnline === false) {
    console.log(chalk.red('🔴 Admin-TK está fuera de línea.'));
  }

  if (receivedPendingNotifications) {
    console.log(chalk.yellow('📨 Recibiendo mensajes pendientes...'));
  }

  if (connection === 'close') {
    console.log(
      chalk.red('🔌 Conexión cerrada, intentando reconectar...')
    );
  }

  global.timestamp.connect = new Date();

  if (
    lastDisconnect &&
    lastDisconnect.error &&
    lastDisconnect.error.output &&
    lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut &&
    conn.ws.readyState !== CONNECTING
  ) {
    console.log(await global.reloadHandler(true));
  }

  if (global.db.data == null) {
    await global.loadDatabase();
  }
}

process.on('uncaughtException', console.error);

// Recarga del handler y plugins
let isInit = true;
let handler = await import('./handler.js');
global.reloadHandler = async function (restartConn) {
  try {
    const Handler = await import(`./handler.js?update=${Date.now()}`).catch(
      console.error
    );
    if (Object.keys(Handler || {}).length) handler = Handler;
  } catch (e) {
    console.error(e);
  }
  if (restartConn) {
    const oldChats = global.conn.chats;
    try {
      global.conn.ws.close();
    } catch {}
    conn.ev.removeAllListeners();
    global.conn = makeWASocket(connectionOptions, { chats: oldChats });
    isInit = true;
  }
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler);
    conn.ev.off('group-participants.update', conn.participantsUpdate);
    conn.ev.off('groups.update', conn.groupsUpdate);
    conn.ev.off('message.delete', conn.onDelete);
    conn.ev.off('connection.update', conn.connectionUpdate);
    conn.ev.off('creds.update', conn.credsUpdate);
  }

  // Mensajes personalizados de Admin-TK que se refiere directamente al usuario
  conn.welcome =
    '👋 Hola @user, soy *Admin-TK*. ¡Bienvenido al grupo *${conn.getName(conn.chat)}*!\n\nPor favor, regístrate usando el comando: `.reg nombre.edad`\n\n📄 Aquí está la descripción del grupo:\n@desc';
  conn.bye = '👋 @user, soy *Admin-TK*. Lamento verte partir. ¡Hasta pronto!';
  conn.spromote = '🎖️ @user, has sido promovido a *ADMIN* por mí, *Admin-TK*. Felicidades.';
  conn.sdemote = '❌ @user, has sido degradado de *ADMIN* por mí, *Admin-TK*.';
  conn.sDesc = '📝 He actualizado la descripción del grupo a:\n\n@desc';
  conn.sSubject = '📝 He cambiado el nombre del grupo a:\n\n*${conn.getName(conn.chat)}*';
  conn.sIcon = '🖼️ He actualizado la imagen del grupo.';
  conn.sRevoke = '🔗 He actualizado el enlace del grupo:\n\n@revoke';
  conn.sAnnounceOn =
    '🔒 He cerrado el grupo. Ahora solo los administradores pueden enviar mensajes.';
  conn.sAnnounceOff =
    '🔓 He abierto el grupo. Todos los miembros pueden enviar mensajes.';
  conn.sRestrictOn =
    '🔒 He restringido la edición de la información del grupo. Solo los administradores pueden hacerlo.';
  conn.sRestrictOff =
    '🔓 He permitido que todos los miembros puedan editar la información del grupo.';

  conn.handler = handler.handler.bind(global.conn);
  conn.participantsUpdate = handler.participantsUpdate.bind(global.conn);
  conn.groupsUpdate = handler.groupsUpdate.bind(global.conn);
  conn.onDelete = handler.deleteUpdate.bind(global.conn);
  conn.connectionUpdate = connectionUpdate.bind(global.conn);
  conn.credsUpdate = saveCreds.bind(global.conn);

  conn.ev.on('messages.upsert', conn.handler);
  conn.ev.on('group-participants.update', conn.participantsUpdate);
  conn.ev.on('groups.update', conn.groupsUpdate);
  conn.ev.on('message.delete', conn.onDelete);
  conn.ev.on('connection.update', conn.connectionUpdate);
  conn.ev.on('creds.update', conn.credsUpdate);
  isInit = false;
  return true;
};

// Inicialización de plugins
const pluginFolder = global.__dirname(join(__dirname, './plugins/index'));
const pluginFilter = (filename) => /\.js$/.test(filename);
global.plugins = {};
async function filesInit() {
  for (let filename of readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      let file = global.__filename(join(pluginFolder, filename));
      const module = await import(file);
      global.plugins[filename] = module.default || module;
    } catch (e) {
      delete global.plugins[filename];
    }
  }
}
filesInit().then(() => Object.keys(global.plugins));

// Recarga dinámica de plugins
global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    let dir = global.__filename(join(pluginFolder, filename), true);
    if (filename in global.plugins) {
      if (existsSync(dir)) conn.logger.info(`♻️ Recargando plugin '${filename}'`);
      else {
        conn.logger.warn(`🗑️ Plugin eliminado '${filename}'`);
        return delete global.plugins[filename];
      }
    } else conn.logger.info(`📦 Cargando nuevo plugin '${filename}'`);
    let err = syntaxerror(readFileSync(dir), filename, {
      sourceType: 'module',
      allowAwaitOutsideFunction: true,
    });
    if (err)
      conn.logger.error(
        `❌ Error de sintaxis al cargar '${filename}'\n${format(err)}`
      );
    else
      try {
        const module = await import(
          `${global.__filename(dir)}?update=${Date.now()}`
        );
        global.plugins[filename] = module.default || module;
      } catch (e) {
        conn.logger.error(
          `❌ Error al requerir plugin '${filename}'\n${format(e)}`
        );
      } finally {
        global.plugins = Object.fromEntries(
          Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b))
        );
      }
  }
};
Object.freeze(global.reload);
watch(pluginFolder, global.reload);
await global.reloadHandler();

// Prueba rápida
async function _quickTest() {
  let test = await Promise.all(
    [
      spawn('ffmpeg'),
      spawn('ffprobe'),
      spawn('ffmpeg', [
        '-hide_banner',
        '-loglevel',
        'error',
        '-filter_complex',
        'color',
        '-frames:v',
        '1',
        '-f',
        'webp',
        '-',
      ]),
      spawn('convert'),
      spawn('magick'),
      spawn('gm'),
      spawn('find', ['--version']),
    ].map((p) => {
      return Promise.race([
        new Promise((resolve) => {
          p.on('close', (code) => {
            resolve(code !== 127);
          });
        }),
        new Promise((resolve) => {
          p.on('error', (_) => resolve(false));
        }),
      ]);
    })
  );
  let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
  console.log(test);
  let s = (global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm,
    find,
  });
  Object.freeze(global.support);
}
_quickTest().then(() =>
  conn.logger.info(
    '☑️ Prueba rápida realizada, nombre de la sesión ~> creds.json'
  )
);
  
