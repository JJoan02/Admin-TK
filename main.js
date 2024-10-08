import './config.js';
import './plugins/_content.js';

// Módulos de Node.js
import { createRequire } from 'module';
import path, { join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { platform } from 'process';
import * as ws from 'ws';
import fs, { watchFile, unwatchFile, writeFileSync, statSync, unlinkSync, existsSync, readFileSync, copyFileSync, watch, rmSync, readdirSync, mkdirSync, renameSync } from 'fs';
import yargs from 'yargs';
import { spawn } from 'child_process';
import lodash from 'lodash';
import chalk from 'chalk';
import syntaxerror from 'syntax-error';
import { tmpdir } from 'os';
import { format } from 'util';
import pino from 'pino';
import { Boom } from '@hapi/boom';
import { makeWASocket, protoType, serialize } from './lib/simple.js';
import { Low, JSONFile } from 'lowdb';
import { mongoDB, mongoDBV2 } from './lib/mongoDB.js';
import store from './lib/store.js';
import readline from 'readline';
import NodeCache from 'node-cache';

const { makeInMemoryStore, DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, PHONENUMBER_MCC } = await import('@whiskeysockets/baileys');
const { CONNECTING } = ws;
const { chain } = lodash;
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;

// Inicialización de prototipos y serialización de datos para el socket de WhatsApp
protoType();
serialize();

// Funciones globales para manejo de rutas y requerimientos
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
  return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString();
};

global.__dirname = function dirname(pathURL) {
  return path.dirname(global.__filename(pathURL, true));
};

global.__require = function require(dir = import.meta.url) {
  return createRequire(dir);
};

// Configuración global de API
global.API = (name, path = '/', query = {}, apikeyqueryname) => 
  (name in global.APIs ? global.APIs[name] : name) + path + 
  (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '');

// Inicialización de la base de datos con LowDB
global.timestamp = { start: new Date };
const __dirname = global.__dirname(import.meta.url);
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
global.prefix = new RegExp('^[' + (opts['prefix'] || '*/i!#$%+£¢€¥^°=¶∆×÷π√✓©®&.\\-.@').replace(/[|\\{}()[\]^$+*.\-\^]/g, '\\$&') + ']');

// Inicialización de la base de datos principal
global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`));
global.DATABASE = global.db;

global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) {
    return new Promise((resolve) => setInterval(async function () {
      if (!global.db.READ) {
        clearInterval(this);
        resolve(global.db.data == null ? global.loadDatabase() : global.db.data);
      }
    }, 1 * 1000));
  }
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
    ...(global.db.data || {}),
  };
  global.db.chain = chain(global.db.data);
};
loadDatabase();

// Inicialización de conexiones globales
if (global.conns instanceof Array) {
  console.log('Conexiones ya inicializadas...');
} else {
  global.conns = [];
}

// Carga y manejo de base de datos de ChatGPT
global.chatgpt = new Low(new JSONFile(path.join(__dirname, '/db/chatgpt.json')));
global.loadChatgptDB = async function loadChatgptDB() {
  if (global.chatgpt.READ) {
    return new Promise((resolve) =>
      setInterval(async function () {
        if (!global.chatgpt.READ) {
          clearInterval(this);
          resolve(global.chatgpt.data === null ? global.loadChatgptDB() : global.chatgpt.data);
        }
      }, 1 * 1000));
  }
  if (global.chatgpt.data !== null) return;
  global.chatgpt.READ = true;
  await global.chatgpt.read().catch(console.error);
  global.chatgpt.READ = null;
  global.chatgpt.data = {
    users: {},
    ...(global.chatgpt.data || {}),
  };
  global.chatgpt.chain = lodash.chain(global.chatgpt.data);
};
loadChatgptDB();

// Configuración de autenticación y directorios de credenciales
global.creds = 'creds.json';
global.authFile = 'AdminSession';
global.authFileJB = 'SubBots-Data';
global.rutaBot = join(__dirname, global.authFile);
global.rutaJadiBot = join(__dirname, global.authFileJB);

if (!fs.existsSync(global.rutaJadiBot)) {
  fs.mkdirSync(global.rutaJadiBot);
}

// Autenticación con múltiples archivos
const { state, saveState, saveCreds } = await useMultiFileAuthState(global.authFile);
const msgRetryCounterMap = (MessageRetryMap) => { };
const msgRetryCounterCache = new NodeCache();
const { version } = await fetchLatestBaileysVersion();

// Configuración de lectura y terminal
let phoneNumber = global.botNumberCode;
const methodCodeQR = process.argv.includes("qr");
const methodCode = !!phoneNumber || process.argv.includes("code");
const MethodMobile = process.argv.includes("mobile");
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

const question = (texto) => {
  rl.clearLine(rl.input, 0);
  return new Promise((resolver) => {
    rl.question(texto, (respuesta) => {
      rl.clearLine(rl.input, 0);
      resolver(respuesta.trim());
    });
  });
};

// Selección de método de autenticación
let opcion;
if (methodCodeQR) {
  opcion = '1';
}
if (!methodCodeQR && !methodCode && !fs.existsSync(`./${global.authFile}/creds.json`)) {
  do {
    let lineM = '⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》';
    opcion = await question(`╭${lineM}  
┊ ${chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
┊ ${chalk.blueBright('┊')} ${chalk.blue.bgBlue.bold.cyan(mid.methodCode1)}
┊ ${chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}   
┊ ${chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}     
┊ ${chalk.blueBright('┊')} ${chalk.green.bgMagenta.bold.yellow(mid.methodCode2)}
┊ ${chalk.blueBright('┊')} ${chalk.bold.redBright(`⇢  ${mid.methodCode3} 1:`)} ${chalk.greenBright(mid.methodCode4)}
┊ ${chalk.blueBright('┊')} ${chalk.bold.redBright(`⇢  ${mid.methodCode3} 2:`)} ${chalk.greenBright(mid.methodCode5)}
┊ ${chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
┊ ${chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}     
┊ ${chalk.blueBright('┊')} ${chalk.italic.magenta(mid.methodCode6)}
┊ ${chalk.blueBright('┊')} ${chalk.italic.magenta(mid.methodCode7)}
┊ ${chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')} 
┊ ${chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}    
┊ ${chalk.blueBright('┊')} ${chalk.red.bgRed.bold.green(mid.methodCode8)}
┊ ${chalk.blueBright('┊')} ${chalk.italic.cyan(mid.methodCode9)}
┊ ${chalk.blueBright('┊')} ${chalk.italic.cyan(mid.methodCode10)}
┊ ${chalk.blueBright('┊')} ${chalk.bold.yellow(`npm run qr ${chalk.italic.magenta(`(${mid.methodCode12})`)}`)}
┊ ${chalk.blueBright('┊')} ${chalk.bold.yellow(`npm run code ${chalk.italic.magenta(`(${mid.methodCode13})`)}`)}
┊ ${chalk.blueBright('┊')} ${chalk.bold.yellow(`npm start ${chalk.italic.magenta(`(${mid.methodCode14})`)}`)}
┊ ${chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')} 
╰${lineM}\n${chalk.bold.magentaBright('---> ')}`)
if (!/^[1-2]$/.test(opcion)) {
console.log(chalk.bold.redBright(mid.methodCode11(chalk)))
}} while (opcion !== '1' && opcion !== '2' || fs.existsSync(`./${authFile}/creds.json`))
}

const filterStrings = [
"Q2xvc2luZyBzdGFsZSBvcGVu", // "Closing stable open"
"Q2xvc2luZyBvcGVuIHNlc3Npb24=", // "Closing open session"
"RmFpbGVkIHRvIGRlY3J5cHQ=", // "Failed to decrypt"
"U2Vzc2lvbiBlcnJvcg==", // "Session error"
"RXJyb3I6IEJhZCBNQUM=", // "Error: Bad MAC" 
"RGVjcnlwdGVkIG1lc3NhZ2U=" // "Decrypted message" 
]
console.info = () => {} 
console.debug = () => {} 
['log', 'warn', 'error'].forEach(methodName => redefineConsoleMethod(methodName, filterStrings))
const connectionOptions = {
logger: pino({ level: 'silent' }),
printQRInTerminal: opcion == '1' ? true : methodCodeQR ? true : false,
mobile: MethodMobile, 
browser: opcion == '1' ? ['Admin-TK', 'Edge', '2.0.0'] : methodCodeQR ? ['Admin-TK', 'Edge', '2.0.0'] : ["Ubuntu", "Chrome", "20.0.04"],
auth: {
creds: state.creds,
keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
},
markOnlineOnConnect: true, 
generateHighQualityLinkPreview: true, 
syncFullHistory: true,
getMessage: async (clave) => {
let jid = jidNormalizedUser(clave.remoteJid)
let msg = await store.loadMessage(jid, clave.id)
return msg?.message || ""
},
msgRetryCounterCache, // Resolver mensajes en espera
msgRetryCounterMap, // Determinar si se debe volver a intentar enviar un mensaje o no
defaultQueryTimeoutMs: undefined,
version,  
}
global.conn = makeWASocket(connectionOptions)
if (!fs.existsSync(`./${authFile}/creds.json`)) {
if (opcion === '2' || methodCode) {
opcion = '2'
if (!conn.authState.creds.registered) {
let addNumber
if (!!phoneNumber) {
addNumber = phoneNumber.replace(/[^0-9]/g, '')
} else {
do {
phoneNumber = await question(chalk.bgBlack(chalk.bold.greenBright(mid.phNumber2(chalk))))
phoneNumber = phoneNumber.replace(/\D/g,'')
} while (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v)))
rl.close()
addNumber = phoneNumber.replace(/\D/g, '')
setTimeout(async () => {
let codeBot = await conn.requestPairingCode(addNumber)
codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot
console.log(chalk.bold.white(chalk.bgMagenta(mid.pairingCode)), chalk.bold.white(chalk.white(codeBot)))
}, 2000)
}}}
}

conn.isInit = false;
conn.well = false;

if (!opts['test']) {
    if (global.db) setInterval(async () => {
        if (global.db.data) await global.db.write();
        if (opts['autocleartmp'] && (global.support || {}).find) {
            tmp = [os.tmpdir(), 'tmp', "SubBots-Data"];
            tmp.forEach(filename => cp.spawn('find', [filename, '-amin', '2', '-type', 'f', '-delete']));
        }
    }, 30 * 1000);
}

if (opts['server']) (await import('./server.js')).default(global.conn, PORT);

async function getMessage(key) {
    if (store) {
        // Implementa la lógica para obtener el mensaje si es necesario
    }
    return {
        conversation: 'SimpleBot',
    };
}

async function connectionUpdate(update) {  
    const { connection, lastDisconnect, isNewLogin } = update;
    global.stopped = connection;

    if (isNewLogin) conn.isInit = true;
    
    const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
    if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
        await global.reloadHandler(true).catch(console.error);
        global.timestamp.connect = new Date();
    }

    if (global.db.data == null) loadDatabase();

    if (update.qr != 0 && update.qr != undefined || methodCodeQR) {
        if (opcion == '1' || methodCodeQR) {
            console.log(chalk.bold.yellow(mid.mCodigoQR));
        }
    }

    if (connection === 'open') {
        console.log(chalk.bold.greenBright(mid.mConexion));
    }

    let reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
    if (connection === 'close') {
        if (reason === DisconnectReason.badSession) {
            console.log(chalk.bold.cyanBright(lenguajeGB['smsConexionOFF']()));
        } else if (reason === DisconnectReason.connectionClosed) {
            console.log(chalk.bold.magentaBright(lenguajeGB['smsConexioncerrar']()));
            await global.reloadHandler(true).catch(console.error);
        } else if (reason === DisconnectReason.connectionLost) {
            console.log(chalk.bold.blueBright(lenguajeGB['smsConexionperdida']()));
            await global.reloadHandler(true).catch(console.error);
        } else if (reason === DisconnectReason.connectionReplaced) {
            console.log(chalk.bold.yellowBright(lenguajeGB['smsConexionreem']()));
        } else if (reason === DisconnectReason.loggedOut) {
            console.log(chalk.bold.redBright(lenguajeGB['smsConexionOFF']()));
            await global.reloadHandler(true).catch(console.error);
        } else if (reason === DisconnectReason.restartRequired) {
            console.log(chalk.bold.cyanBright(lenguajeGB['smsConexionreinicio']()));
            await global.reloadHandler(true).catch(console.error);
        } else if (reason === DisconnectReason.timedOut) {
            console.log(chalk.bold.yellowBright(lenguajeGB['smsConexiontiem']()));
            await global.reloadHandler(true).catch(console.error); // Descomenta si quieres reiniciar el proceso
        } else {
            console.log(chalk.bold.redBright(lenguajeGB['smsConexiondescon'](reason, connection)));
        }
    }
}

process.on('uncaughtException', console.error);

async function connectSubBots() {
    const subBotDirectory = './SubBots-Data';
    if (!existsSync(subBotDirectory)) {
        console.log('No se encontraron ningun sub-bots.');
        return;
    }
    const subBotFolders = readdirSync(subBotDirectory).filter(file => 
        statSync(path.join(subBotDirectory, file)).isDirectory()
    );
    const botPromises = subBotFolders.map(async folder => {
        const authFile = path.join(subBotDirectory, folder);
        if (existsSync(path.join(authFile, 'creds.json'))) {
            return await connectionUpdate(authFile);
        }
    });
    const bots = await Promise.all(botPromises);
    global.conns = bots.filter(Boolean);
    console.log(chalk.bold.greenBright(`✅ TODOS LOS SUB-BOTS SE HAN INICIADO CORRECTAMENTE`));
}

(async () => {
    global.conns = [];
    const mainBotAuthFile = 'AdminSession';
    try {
        const mainBot = await connectionUpdate(mainBotAuthFile);
        global.conns.push(mainBot);
        console.log(chalk.bold.greenBright(`✅ BOT PRINCIPAL INICIANDO CORRECTAMENTE`));
        await connectSubBots();
    } catch (error) {
        console.error(chalk.bold.cyanBright(`❌ OCURRIÓ UN ERROR AL INICIAR EL BOT PRINCIPAL: `, error));
    }
})();

let isInit = true;
let handler = await import('./handler.js');
global.reloadHandler = async function(restatConn) {
    try {
        const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error);
        if (Object.keys(Handler || {}).length) handler = Handler;
    } catch (e) {
        console.error(e);
    }
    if (restatConn) {
        const oldChats = global.conn.chats;
        try {
            global.conn.ws.close();
        } catch { }
        conn.ev.removeAllListeners();
        global.conn = makeWASocket(connectionOptions, { chats: oldChats });
        isInit = true;
    }
    if (!isInit) {
        conn.ev.off('messages.upsert', conn.handler);
        conn.ev.off('group-participants.update', conn.participantsUpdate);
        conn.ev.off('groups.update', conn.groupsUpdate);
        conn.ev.off('message.delete', conn.onDelete);
        conn.ev.off('call', conn.onCall);
        conn.ev.off('connection.update', conn.connectionUpdate);
        conn.ev.off('creds.update', conn.credsUpdate);
    }
    // Información para Grupos
    conn.welcome = lenguajeGB['smsWelcome']() 
    conn.bye = lenguajeGB['smsBye']() 
    conn.spromote = lenguajeGB['smsSpromote']() 
    conn.sdemote = lenguajeGB['smsSdemote']() 
    conn.sDesc = lenguajeGB['smsSdesc']() 
    conn.sSubject = lenguajeGB['smsSsubject']() 
    conn.sIcon = lenguajeGB['smsSicon']() 
    conn.sRevoke = lenguajeGB['smsSrevoke']()  
    conn.handler = handler.handler.bind(global.conn);
    conn.participantsUpdate = handler.participantsUpdate.bind(global.conn);
    conn.groupsUpdate = handler.groupsUpdate.bind(global.conn);
    conn.onDelete = handler.deleteUpdate.bind(global.conn);
    conn.onCall = handler.callUpdate.bind(global.conn);
    conn.connectionUpdate = connectionUpdate.bind(global.conn);
    conn.credsUpdate = saveCreds.bind(global.conn, true);
    conn.ev.on('messages.upsert', conn.handler);
    conn.ev.on('group-participants.update', conn.participantsUpdate);
    conn.ev.on('groups.update', conn.groupsUpdate);
    conn.ev.on('message.delete', conn.onDelete);
    conn.ev.on('call', conn.onCall);
    conn.ev.on('connection.update', conn.connectionUpdate);
    conn.ev.on('creds.update', conn.credsUpdate);
    isInit = false;
    return true;
}

// Define la carpeta de plugins y el filtro (ajusta según tu implementación)
const pluginFolder = path.join(__dirname, 'plugins');  // Usa path.join para asegurar la correcta resolución de la ruta

// Filtro para asegurar que el archivo es un plugin (.js)
const pluginFilter = (filename) => typeof filename === 'string' && filename.endsWith('.js');

// Inicializa los plugins en un objeto global
global.plugins = {};

async function filesInit() {
  const plugins = {};
  const files = readdirSync(pluginFolder).filter(pluginFilter);
  
  for (const filename of files) {
    try {
      const file = path.join(pluginFolder, filename);
      console.log(`Cargando archivo: ${file}`);
      const module = await import(file);
      plugins[filename] = module.default || module;
    } catch (e) {
      console.error(`Error al cargar el plugin ${filename}:`, e.message);
      console.error(e.stack);
    }
  }
  
  global.plugins = plugins;
}

filesInit().then(() => {
  console.log('Plugins cargados exitosamente:', Object.keys(global.plugins));
}).catch((err) => {
  console.error('Error al inicializar plugins:', err.message);
  console.error(err.stack);
});

// Maneja la actualización y carga de nuevos plugins
global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    const dir = path.join(pluginFolder, filename);
    
    if (filename in global.plugins) {
      if (existsSync(dir)) {
        console.info(` SE ACTUALIZÓ - '${filename}' CON ÉXITO`);
      } else {
        console.warn(` SE ELIMINÓ UN ARCHIVO : '${filename}'`);
        delete global.plugins[filename];
      }
    } else if (existsSync(dir)) {
      console.info(` SE DETECTÓ UN NUEVO PLUGIN : '${filename}'`);
      try {
        const module = await import(dir);
        global.plugins[filename] = module.default || module;
      } catch (e) {
        console.error(`Error al cargar el nuevo plugin ${filename}:`, e.message);
        delete global.plugins[filename];
      }
    }
  }
};

// Observa los cambios en los archivos de plugins
readdirSync(pluginFolder).filter(pluginFilter).forEach((filename) => {
  watchFile(path.join(pluginFolder, filename), global.reload);
});

// Limpia todos los archivos dentro del directorio 'tmp'
function clearTmp() {
    const tmpDir = join(__dirname, 'tmp');
    const filenames = readdirSync(tmpDir);

    // Itera sobre todos los archivos en la carpeta tmp y los elimina
    filenames.forEach(file => {
        const filePath = join(tmpDir, file);
        unlinkSync(filePath);
    });
}

// Elimina las pre-claves (pre-keys) del directorio de sesión principal 'AdminSession'
function purgeSession() {
    let prekey = [];
    let directorio = readdirSync("./AdminSession"); // Cambiado a AdminSession
    let filesFolderPreKeys = directorio.filter(file => file.startsWith('pre-key-'));

    prekey = [...prekey, ...filesFolderPreKeys];

    // Elimina cada archivo pre-key en la carpeta de sesión principal
    filesFolderPreKeys.forEach(files => {
        unlinkSync(`./AdminSession/${files}`); // Cambiado a AdminSession
    });
}

// Elimina las pre-claves (pre-keys) de los subbots en el directorio 'SubBots-Data'
function purgeSessionSB() {
    try {
        const listaDirectorios = readdirSync('./SubBots-Data/'); // Cambiado a SubBots-Data
        let SBprekey = [];

        listaDirectorios.forEach(directorio => {
            if (statSync(`./SubBots-Data/${directorio}`).isDirectory()) {
                const DSBPreKeys = readdirSync(`./SubBots-Data/${directorio}`).filter(fileInDir => fileInDir.startsWith('pre-key-'));
                SBprekey = [...SBprekey, ...DSBPreKeys];

                // Elimina cada archivo pre-key excepto 'creds.json'
                DSBPreKeys.forEach(fileInDir => {
                    if (fileInDir !== 'creds.json') {
                        unlinkSync(`./SubBots-Data/${directorio}/${fileInDir}`);
                    }
                });
            }
        });

        if (SBprekey.length === 0) {
            console.log(chalk.bold.green(lenguajeGB.smspurgeSessionSB1())); // Mensaje de éxito si no hay pre-claves
        } else {
            console.log(chalk.bold.cyanBright(lenguajeGB.smspurgeSessionSB2())); // Mensaje de éxito si se eliminaron pre-claves
        }
    } catch (err) {
        console.log(chalk.bold.red(lenguajeGB.smspurgeSessionSB3() + err)); // Mensaje de error
    }
}

// Elimina todos los archivos antiguos excepto 'creds.json' en los directorios de sesión y subbots
function purgeOldFiles() {
    const directories = ['./AdminSession/', './SubBots-Data/']; // Actualizado con las nuevas rutas
    directories.forEach(dir => {
        const files = readdirSync(dir);

        // Itera sobre los archivos y elimina los que no sean 'creds.json'
        files.forEach(file => {
            if (file !== 'creds.json') {
                const filePath = join(dir, file);
                unlinkSync(filePath);
            }
        });
    });
}

// Redefine un método de consola para filtrar ciertos strings en los mensajes
function redefineConsoleMethod(methodName, filterStrings) {
    const originalConsoleMethod = console[methodName];
    console[methodName] = function () {
        const message = arguments[0];
        // Si el mensaje contiene un string filtrado, lo reemplaza por una cadena vacía
        if (typeof message === 'string' && filterStrings.some(filterString => message.includes(atob(filterString)))) {
            arguments[0] = "";
        }
        originalConsoleMethod.apply(console, arguments);
    };
}

// Intervalo para limpiar el directorio 'tmp' cada 4 minutos
setInterval(async () => {
    if (stopped === 'close' || !conn || !conn.user) return;
    await clearTmp();
    console.log(chalk.bold.cyanBright(lenguajeGB.smsClearTmp())); // Mensaje en consola
}, 1000 * 60 * 4); // 4 minutos

// Intervalo para eliminar archivos antiguos cada 10 minutos
setInterval(async () => {
    if (stopped === 'close' || !conn || !conn.user) return;
    await purgeOldFiles();
    console.log(chalk.bold.cyanBright(lenguajeGB.smspurgeOldFiles())); // Mensaje en consola
}, 1000 * 60 * 10); // 10 minutos

// Prueba rápida al cargar el bot
//_quickTest().then(() => conn.logger.info(chalk.bold(lenguajeGB.smsCargando().trim()))).catch(console.error);

// Vigila el archivo principal para reiniciar en caso de cambios
let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
    unwatchFile(file);
    console.log(chalk.bold.greenBright(lenguajeGB.smsMainBot().trim())); // Mensaje en consola
    import(`${file}?update=${Date.now()}`);
});
