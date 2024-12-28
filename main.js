/*
   =========================================================================================
   main.js - Código "Robusto" + "IA Cobrando Vida" con Vinculación por Código de 8 Dígitos
   =========================================================================================

   ¡Secuencia de arranque simulando inicialización de una "IA" antes de vincular el WhatsApp!
   Implementa un flujo inteligente para usar sesiones existentes o resetear y generar un nuevo código.
*/

////////////////////////////////////
// 1) Importar config.js
////////////////////////////////////
import './config.js'; // Ajusta la ruta si tu config.js está en otro lugar

////////////////////////////////////
// 2) Imports Principales
////////////////////////////////////
import chalk from 'chalk';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs';
import { spawn } from 'child_process';
import pino from 'pino';
import ws from 'ws';
import readline from 'readline';

import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  mkdirSync,
  rmSync
} from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { platform, argv } from 'process';
import { fileURLToPath, pathToFileURL } from 'url';
import { createRequire } from 'module';

////////////////////////////////////
// 3) Baileys (whiskeysockets)
////////////////////////////////////
import pkg from '@adiwajshing/baileys'; // "npm:@whiskeysockets/baileys@latest"
const {
  makeInMemoryStore,
  useMultiFileAuthState,
  makeCacheableSignalKeyStore,
  fetchLatestBaileysVersion,
  DisconnectReason,
} = pkg;

////////////////////////////////////
// 4) LowDB / Mongo Adaptadores (Opcional)
////////////////////////////////////
import { Low, JSONFile } from 'lowdb';
import cloudDBAdapter from './lib/cloudDBAdapter.js'; // Quita si no lo usas
import { mongoDB, mongoDBV2 } from './lib/mongoDB.js'; // Quita si no lo usas

////////////////////////////////////
// 5) Baileys Personal
////////////////////////////////////
import { makeWASocket, protoType, serialize } from './lib/simple.js';
protoType();
serialize();

/*
   ============================================================
   6) Variables Globales y Config
   ============================================================
*/
let isInit = false;
const { CONNECTING } = ws;
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;

// Definir __filename / __dirname
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
  return rmPrefix
    ? pathURL.startsWith('file://')
      ? fileURLToPath(pathURL)
      : pathURL
    : pathToFileURL(pathURL).toString();
};
global.__dirname = function dirname(pathURL) {
  return new URL('.', pathURL).pathname;
};
const projectDir = global.__dirname(import.meta.url);

// createRequire
global.__require = function require(dir = import.meta.url) {
  return createRequire(dir);
};

// APIs (opcional)
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
                  global.APIKeys[name in global.APIs ? global.APIs[name] : name]
              }
            : {})
        })
      )
    : '');

global.timestamp = { start: new Date() };
global.opts = yargs(hideBin(argv)).exitProcess(false).parse();
global.prefix = new RegExp(
  '^[' +
    (global.opts['prefix'] || '/\\!\\.\\^').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') +
    ']'
);

/*
   ============================
   7) Base de datos con LowDB
   ============================
*/
global.db = new Low(
  /https?:\/\//.test(global.opts['db'] || '')
    ? new cloudDBAdapter(global.opts['db'])
    : /mongodb(\+srv)?:\/\//i.test(global.opts['db'])
    ? global.opts['mongodbv2']
      ? new mongoDBV2(global.opts['db'])
      : new mongoDB(global.opts['db'])
    : new JSONFile(`${global.opts._[0] ? global.opts._[0] + '_' : ''}database.json`)
);
global.DATABASE = global.db;

global.loadDatabase = async function loadDatabase() {
  if (global.db.READ)
    return new Promise((resolve) =>
      setInterval(async function () {
        if (!global.db.READ) {
          clearInterval(this);
          resolve(global.db.data == null ? global.loadDatabase() : global.db.data);
        }
      }, 1000)
    );
  if (global.db.data !== null) return;
  global.db.READ = true;
  await global.db.read().catch(console.error);
  global.db.READ = null;
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(global.db.data || {})
  };
};
await global.loadDatabase();

// ========================
// 8) Carpeta de Sesión
// ========================
const sessionsFolder = './TK-Session';
if (!existsSync(sessionsFolder)) {
  mkdirSync(sessionsFolder);
  console.log(chalk.green('Carpeta TK-Session creada.'));
}

// ========================
// 9) Carpeta plugins
// ========================
const pluginsFolder = join(projectDir, 'plugins');
if (!existsSync(pluginsFolder)) {
  mkdirSync(pluginsFolder);
  console.log(chalk.magenta('✔ Carpeta "plugins" creada automáticamente (vacía).'));
}

/*
   ===================================
   10) Menú Interactivo + phoneNumber
   ===================================
*/
async function showMenu() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const menuText = `
${chalk.hex('#FF69B4').bold('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓')}
${chalk.hex('#FF69B4').bold('┃')}  ${chalk.bold.bgMagenta('  MENÚ DE VINCULACIÓN  ')}  ${chalk.hex('#FF69B4').bold('┃')}
${chalk.hex('#FF69B4').bold('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛')}

${chalk.cyanBright('[1]')} Vincular por código de 8 dígitos ${chalk.yellow('🔑')}
${chalk.cyanBright('[2]')} Creado por Joan TK (igual genera code) ${chalk.greenBright('✅')}

Elige (1 o 2): `;

  function askMenu() {
    return new Promise((resolve) => {
      rl.question(menuText, (answer) => resolve(answer.trim()));
    });
  }

  while (true) {
    const choice = await askMenu();
    if (choice === '1' || choice === '2') {
      rl.close();
      return choice;
    } else {
      console.log(chalk.redBright('❌ Debes elegir "1" o "2". Intenta de nuevo.\n'));
    }
  }
}

async function askPhoneNumber() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const askText = chalk.blueBright('\n📲 Escribe tu número de WhatsApp (sin +), ej: 5191052145:\n> ');

  return new Promise((resolve) => {
    rl.question(askText, (num) => {
      rl.close();
      resolve(num.trim());
    });
  });
}

/*
   ==========================================
   11) Limpieza de Sesiones + temporales
   ==========================================
*/
function clearSessions(folder = sessionsFolder) {
  try {
    const filenames = readdirSync(folder);
    for (let file of filenames) {
      const filePath = join(folder, file);
      const stats = statSync(filePath);
      // No borramos "creds.json" si ya existe
      if (stats.isFile() && file !== 'creds.json') {
        unlinkSync(filePath);
        console.log(chalk.gray('Sesión eliminada:', filePath));
      }
    }
  } catch (err) {
    console.error(chalk.redBright(`Error en Clear Sessions: ${err.message}`));
  } finally {
    setTimeout(() => clearSessions(folder), 60 * 60 * 1000); // Cada 1 hora
  }
}

function clearTmp() {
  const tmpDirs = [tmpdir(), join(global.__dirname(import.meta.url), 'tmp')];
  const files = [];
  for (let dirname of tmpDirs) {
    if (existsSync(dirname)) {
      for (let file of readdirSync(dirname)) {
        files.push(join(dirname, file));
      }
    }
  }
  for (let file of files) {
    const stats = statSync(file);
    if (stats.isFile() && Date.now() - stats.mtimeMs >= 1000 * 60 * 3) {
      unlinkSync(file);
    }
  }
}

// Reset de límites
async function resetLimit() {
  try {
    const users = global.db.data.users || {};
    const lim = 25;
    for (let user in users) {
      if (users[user].limit <= lim) {
        users[user].limit = lim;
      }
    }
    console.log(chalk.yellowBright('✅ Límite de usuarios restablecido automáticamente.'));
  } finally {
    setTimeout(() => resetLimit(), 24 * 60 * 60 * 1000); // Cada 24 horas
  }
}

/*
   ========================================
   12) reloadHandler => "handler.js"
   ========================================
*/
export async function reloadHandler(restartConn = false) {
  try {
    const Handler = await import(`./handler.js?update=${Date.now()}`);
    if (Handler && Object.keys(Handler).length) {
      global.handler = Handler;
    }
  } catch (e) {
    console.error(chalk.redBright('❌ Error al cargar handler:'), e);
  }

  if (restartConn) {
    const oldChats = global.conn?.chats || {};
    try {
      global.conn?.ws?.close();
    } catch {}
    global.conn?.ev?.removeAllListeners();
    global.conn = makeWASocket(global.connectionOptions, { chats: oldChats });
    isInit = true;
  }

  if (!isInit) {
    if (typeof global.conn?.handler?.handler === 'function') {
      global.conn.ev.off('messages.upsert', global.conn.handler.handler);
    }
    if (typeof global.conn?.handler?.participantsUpdate === 'function') {
      global.conn.ev.off('group-participants.update', global.conn.handler.participantsUpdate);
    }
    if (typeof global.conn?.handler?.groupsUpdate === 'function') {
      global.conn.ev.off('groups.update', global.conn.handler.groupsUpdate);
    }
    if (typeof global.conn?.handler?.deleteUpdate === 'function') {
      global.conn.ev.off('message.delete', global.conn.handler.deleteUpdate);
    }
    global.conn.ev.off('connection.update', connectionUpdate);
    if (typeof global.saveCredsFunction === 'function') {
      global.conn.ev.off('creds.update', global.saveCredsFunction);
    }
  }

  // Mensajes de grupo (opcional)
  global.conn.welcome = `🌟 ¡Bienvenido! 🌟
👋 Hola @user, disfruta tu estadía en:
@subject

Por favor, regístrate usando:
.reg nombre.edad

Descripción del grupo:
@desc
`;
  global.conn.spromote = '🦾 @user ahora es administrador!';
  global.conn.sdemote = '🪓 @user ya no es administrador!';
  global.conn.sDesc = '📝 La descripción se actualizó a:\n@desc';
  global.conn.sSubject = '🏷️ El nombre del grupo cambió a:\n@subject';
  global.conn.sIcon = '🖼️ Cambió la foto del grupo!';
  global.conn.sRevoke = '🔗 El link del grupo se actualizó:\n@revoke';
  global.conn.sAnnounceOn = '🚧 Grupo cerrado!\nSólo los admins pueden enviar mensajes.';
  global.conn.sAnnounceOff = '🚪 El grupo fue abierto!\nAhora todos pueden enviar mensajes.';
  global.conn.sRestrictOn = '⚙️ Sólo los administradores pueden editar la información del grupo.';
  global.conn.sRestrictOff = '🌐 Todos pueden editar la información del grupo.';

  if (global.handler) {
    global.conn.handler = global.handler.handler?.bind(global.conn);
    global.conn.participantsUpdate = global.handler.participantsUpdate?.bind(global.conn);
    global.conn.groupsUpdate = global.handler.groupsUpdate?.bind(global.conn);
    global.conn.deleteUpdate = global.handler.deleteUpdate?.bind(global.conn);

    if (global.conn.handler) {
      global.conn.ev.on('messages.upsert', global.conn.handler);
    }
    if (global.conn.participantsUpdate) {
      global.conn.ev.on('group-participants.update', global.conn.participantsUpdate);
    }
    if (global.conn.groupsUpdate) {
      global.conn.ev.on('groups.update', global.conn.groupsUpdate);
    }
    if (global.conn.deleteUpdate) {
      global.conn.ev.on('message.delete', global.conn.deleteUpdate);
    }
  }

  global.conn.ev.on('connection.update', connectionUpdate);
  if (typeof global.saveCredsFunction === 'function') {
    global.conn.ev.on('creds.update', global.saveCredsFunction);
  }

  isInit = false;
  return true;
}

/*
   ===============================================================
   13) postLinkFlow => Mensajes tras code (Límite, server, etc.)
   ===============================================================
*/
let postLinkOnce = false;
async function postLinkFlow() {
  if (postLinkOnce) return;
  postLinkOnce = true;

  console.log(chalk.yellow('Ya estás registrado con el code => iniciamos postLinkFlow'));
  // 1) resetLimit => "Límite restablecido"
  resetLimit();

  // 2) "Servidor listo en => PORT"
  console.log(chalk.green(`\n🌐 Servidor listo en puerto => ${PORT}`));

  // 3) Dependencias checadas => se hace _quickTest
  await _quickTest();
}

/*
   =======================================================
   14) initWhatsApp => Menú => phone => crea conn => ...
   =======================================================
*/
async function initWhatsApp() {
  // Menú
  const choice = await showMenu();
  console.log(chalk.blueBright(`Elegiste la opción ${choice} => Generar code 8 díg.`));

  // Pedimos número de teléfono
  const phoneNumber = await askPhoneNumber();
  console.log(chalk.greenBright(`[✅ PHONE RECIBIDO] ${phoneNumber}`));

  // Verificamos si la carpeta de sesión tiene credenciales registradas
  const { state, saveCreds } = await useMultiFileAuthState(sessionsFolder);
  global.saveCredsFunction = saveCreds;

  const isRegistered = state.creds.registered;
  console.log(chalk.gray('DBG => Creds Registered:', isRegistered));

  if (!isRegistered) {
    // Si no está registrado, reseteamos la sesión para asegurar
    resetSession();
  }

  // Obtener versión de Baileys
  const { version } = await fetchLatestBaileysVersion();

  // Opciones de Conexión
  const connectionOptions = {
    version,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false, // No imprimir QR
    browser: ['Ubuntu', 'Chrome', '20.0.04'],
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
    connectTimeoutMs: 120000, // Aumentado para mayor estabilidad
    defaultQueryTimeoutMs: 120000, // Aumentado para mayor estabilidad
    syncFullHistory: true,
    markOnlineOnConnect: true
  };

  // Creamos store en memoria
  const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });
  store.readFromFile('./baileys_store.json');
  setInterval(() => store.writeToFile('./baileys_store.json'), 10000);

  // Creamos conexión
  global.conn = makeWASocket(connectionOptions);
  global.conn.isInit = false;

  // Guardamos phoneNumber global para generar el code si es necesario
  global.phoneNumberForPairing = phoneNumber;
  postLinkOnce = false;

  // Listeners
  global.conn.ev.on('connection.update', connectionUpdate);
  // Escuchamos "creds.update" => si se registra => postLinkFlow
  global.conn.ev.on('creds.update', () => {
    if (global.conn?.authState?.creds?.registered && !postLinkOnce) {
      postLinkFlow(); // Se llama 1 sola vez
    }
  });

  // Handler general
  global.reloadHandler = async function (restartConn) {
    return reloadHandler(restartConn);
  };
  await global.reloadHandler();

  // Limpiamos sesiones antiguas (no borra 'creds.json' salvo en resetSession)
  clearSessions();

  // Aún NO mostramos "Servidor => ..." ni "resetLimit".
  // Se hará cuando se registre => postLinkFlow
}

/*
   ==========================================================
   15) connectionUpdate => Pedir code en "open", reset en close
   ==========================================================
*/
async function connectionUpdate(update) {
  const { connection, lastDisconnect } = update;

  if (connection === 'connecting') {
    console.log(chalk.yellow('⏳ Conectando a WhatsApp...'));
  } else if (connection === 'open') {
    console.log(chalk.greenBright('✅ Conexión establecida.'));

    // Verificamos si está registrado
    const isRegistered = global.conn.authState?.creds?.registered;
    console.log(chalk.gray('DBG => Creds Registered:', isRegistered));

    if (!isRegistered && typeof global.conn.requestPairingCode === 'function') {
      try {
        const phoneNumber = global.phoneNumberForPairing || '51999999999';
        let code = await global.conn.requestPairingCode(phoneNumber);

        if (code) {
          // Insertamos guiones cada 4 dígitos (XXXX-XXXX) para mayor legibilidad
          code = code.match(/.{1,4}/g)?.join('-') || code;
          console.log(chalk.magentaBright(`\n🔑 Tu código de emparejamiento es: `) + chalk.yellow.bold(code));
          console.log(chalk.gray('   Ingresa este código en tu WhatsApp para vincular.\n'));
        } else {
          console.log(chalk.redBright('⚠️ No se pudo generar el code de emparejamiento.'));
        }
      } catch (err) {
        console.error(chalk.redBright('❌ Error al solicitar pairing code:'), err);
      }
    } else if (isRegistered) {
      console.log(chalk.greenBright('✔ La sesión ya está registrada.'));
      console.log(chalk.gray('   Puedes comenzar a usar el bot.'));
    } else {
      console.log(chalk.red('⚠️ requestPairingCode no está disponible.'));
    }
  }

  if (connection === 'close') {
    console.log(chalk.red('❌ Se perdió la conexión... Reseteando TK-Session.'));
    resetSession();
    console.log(chalk.cyan('Esperamos 45s y re-iniciamos la vinculación...'));
    setTimeout(async () => {
      await initWhatsApp();
    }, 45000);
  }

  global.timestamp.connect = new Date();
  if (global.db.data == null) {
    await global.loadDatabase();
  }
}

/*
   =========================================
   16) _quickTest => Chequeo de dependencias
   =========================================
*/
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
        '-'
      ]),
      spawn('convert'),
      spawn('magick'),
      spawn('gm'),
      spawn('find', ['--version'])
    ].map((p) =>
      Promise.race([
        new Promise((resolve) => {
          p.on('close', (code) => {
            resolve(code !== 127);
          });
        }),
        new Promise((resolve) => {
          p.on('error', (_) => resolve(false));
        })
      ])
    )
  );
  console.log(chalk.blueBright('🔍 Dependencias checadas:'), test);
  console.log(chalk.greenBright('☑️ Prueba rápida realizada, sesión => creds.json'));
}

/*
   ============================
   17) Secuencia de Arranque
   ============================
*/
async function startUpSequence() {
  console.clear();
  const steps = [
    'Inicializando sinapsis cognitivas virtuales...',
    'Estableciendo red neuronal interna...',
    'Compilando módulos lingüísticos avanzados...',
    'Cargando conciencia artificial en memoria...'
  ];

  for (let i = 0; i < steps.length; i++) {
    console.log(chalk.cyan(`🤖 ${steps[i]}`));
    await new Promise(resolve => setTimeout(resolve, 1500));
  }

  console.log(chalk.green('\n¡Hola! Soy tu Asistente IA. Comencemos la vinculación...\n'));
  await initWhatsApp(); // Iniciamos la parte real del bot
}

/*
   ============================
   18) Llamamos a startUpSequence
   ============================
*/
startUpSequence().catch(console.error);
