import yargs from 'yargs';
import cfonts from 'cfonts';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { createRequire } from 'module';
import { createInterface } from 'readline';
import { setupMaster, fork } from 'cluster';
import { watchFile, unwatchFile } from 'fs';

// Configuración global
const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname); // Permite usar `require` en ES Modules
const { name, author } = require(join(__dirname, './package.json')); // Carga la información desde el package.json
const rl = createInterface(process.stdin, process.stdout);
let procesoEjecutandose = false; // Indicador para saber si el proceso está corriendo

// Función para mostrar los banners de inicio
function mostrarBanner() {
  const banners = [
    { texto: 'Admin-TK', fuente: 'console', alineación: 'center', colores: ['cyan'] }, // Cambiamos 'block' a 'console' para un tamaño más pequeño
    { texto: 'TK-HOST', fuente: 'console', alineación: 'center', colores: ['red'] }, // También reducido
    { texto: 'Creado por • JoanTK', fuente: 'console', alineación: 'center', colores: ['magenta'] }
  ];

  banners.forEach((banner) =>
    cfonts.say(banner.texto, {
      font: banner.fuente,
      align: banner.alineación,
      colors: banner.colores,
    })
  );

  console.log('✦ Iniciando Admin TK...');
}

// Función para iniciar un archivo principal
function iniciar(file) {
  if (procesoEjecutandose) return; // Evitar múltiples instancias
  procesoEjecutandose = true;

  const args = [join(__dirname, file), ...process.argv.slice(2)];
  cfonts.say(args.join(' '), { font: 'console', align: 'center', gradient: ['red', 'magenta'] });

  // Configurar proceso maestro y forkar el proceso hijo
  setupMaster({ exec: args[0], args: args.slice(1) });
  const procesoHijo = fork();

  // Escuchar mensajes del proceso hijo
  procesoHijo.on('message', (data) => {
    console.log('[✅RECIBIDO]', data);

    switch (data) {
      case 'reset': // Reiniciar el proceso
        procesoHijo.kill();
        procesoEjecutandose = false;
        iniciar(file);
        break;

      case 'uptime': // Enviar tiempo de actividad
        procesoHijo.send(process.uptime());
        break;

      default:
        console.log('Mensaje desconocido recibido:', data);
        break;
    }
  });

  // Manejo de salida del proceso hijo
  procesoHijo.on('exit', (code) => {
    procesoEjecutandose = false;
    console.error('[✦] El proceso finalizó con el código:', code);

    if (code !== 0) {
      iniciar(file); // Reinicia automáticamente si falla
    } else {
      watchFile(args[0], () => {
        unwatchFile(args[0]);
        iniciar(file); // Reinicia si el archivo principal cambia
      });
    }
  });

  // Configurar entrada interactiva desde la línea de comandos
  const opciones = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
  if (!rl.listenerCount('line')) {
    rl.on('line', (linea) => {
      procesoHijo.emit('message', linea.trim());
    });
  }
}

// Mostrar el banner y arrancar el proceso principal
mostrarBanner();
iniciar('main.js');
