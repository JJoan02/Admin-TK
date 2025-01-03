import { openDb } from '../data/codigos.js';
import fs from 'fs';

// Function to generate a unique code
function generarCodigoUnico() {
  const longitud = 6; // longitud del código
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // caracteres permitidos
  let codigo = '';
  for (let i = 0; i < longitud; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return codigo;
}

// Main handler function
let handler = async (m, { conn, args }) => {
  try {
    let codigoIngresado = args[0];
    if (!codigoIngresado) throw '❌ *Debes ingresar el código proporcionado.*\n\n💡 _Ejemplo:_ `.canjearcodigosb XXX-XXX`';

    // Verificar si el usuario ya está verificado
    let verificacion = {};
    if (fs.existsSync('./data/codigos.json')) {
      verificacion = JSON.parse(fs.readFileSync('./data/codigos.json'));
      if (verificacion[m.sender]) {
        throw '❌ *Ya estás verificado.*';
      }
    }

    // Abrir la base de datos
    let db = await openDb();
    if (!db) throw '❌ *Error al abrir la base de datos.*';

    // Crear la tabla `codigos` si no existe
    await db.run(`CREATE TABLE IF NOT EXISTS codigos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo TEXT NOT NULL,
        usuario TEXT NOT NULL,
        creadoEn TEXT NOT NULL,
        expiraEn TEXT NOT NULL,
        expirado INTEGER DEFAULT 0,
        canjeado INTEGER DEFAULT 0
    )`);

    // Limpiar códigos expirados antes de proceder
    await limpiarCodigosExpirados(db);

    let codigoObj = await db.get(`SELECT * FROM codigos WHERE codigo = ? AND usuario = ? AND expirado = 0`, [codigoIngresado, m.sender]);

    if (!codigoObj) throw '❌ *El código ingresado no es válido o no está asociado a tu número.*';
    if (codigoObj.canjeado) throw '❌ *El código ya ha sido canjeado.*';
    if (new Date() > new Date(codigoObj.expiraEn)) {
      await db.run('UPDATE codigos SET expirado = 1 WHERE codigo = ?', [codigoIngresado]);
      throw '⏳ *El código ha expirado.* Por favor, solicita uno nuevo al administrador.';
    }

    // Crear la tabla `vinculaciones` si no existe
    await db.run(`CREATE TABLE IF NOT EXISTS vinculaciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigoVinculacion TEXT NOT NULL,
        usuario TEXT NOT NULL,
        creadoEn TEXT NOT NULL,
        expiraEn TEXT NOT NULL,
        expirado INTEGER DEFAULT 0
    )`);

    // Generar código de vinculación
    let codigoVinculacion = generarCodigoUnico();
    let expiracion = new Date(Date.now() + 5 * 60 * 1000); // 5 minutos

    // Verificar si el usuario ya tiene un código de vinculación activo
    let vinculacionObj = await db.get('SELECT * FROM vinculaciones WHERE usuario = ? AND expirado = 0', [m.sender]);
    if (vinculacionObj) throw '⚠️ *Ya tienes un código de vinculación activo.*';

    // Insertar el código de vinculación en la base de datos
    await db.run(
      'INSERT INTO vinculaciones (codigoVinculacion, usuario, creadoEn, expiraEn) VALUES (?, ?, ?, ?)',
      [codigoVinculacion, m.sender, new Date().toISOString(), expiracion.toISOString()]
    );

    // Enviar el código de vinculación al usuario
    await conn.sendMessage(m.chat, {
      text: `*🔑 CÓDIGO DE VINCULACIÓN 🔑*\n\n🔒 *Tu código de vinculación es:* *${codigoVinculacion}*\n\n*📋 Instrucciones:*\n\n1️⃣ _Abre WhatsApp en tu teléfono._\n2️⃣ _Ve a Configuración > Dispositivos vinculados._\n3️⃣ _Toca en "Vincular un dispositivo" y selecciona "Vincular con código"._\n4️⃣ _Ingresa el código proporcionado._\n\n⏱️ *Nota:* El código expira en 5 minutos.`,
    });

    // Marcar el código original como canjeado
    await db.run('UPDATE codigos SET canjeado = 1 WHERE codigo = ?', [codigoIngresado]);

    // Confirmación de canje exitoso
    await conn.sendMessage(m.chat, {
      text: `✅ *¡Código de SubBot canjeado con éxito!* 🎉\n\nPuedes continuar usando las funcionalidades del SubBot.`,
    });

    // Grabar la verificación en el archivo /data/codigos.json
    verificacion[m.sender] = {
      codigo: codigoIngresado,
      expiracion: expiracion.toISOString(),
    };
    fs.writeFileSync('./data/codigos.json', JSON.stringify(verificacion, null, 2));
  } catch (error) {
    await conn.sendMessage(m.chat, {
      text: `❌ *Ha ocurrido un error:* ${error}`,
    });
  }
};

async function limpiarCodigosExpirados(db) {
  await db.run('UPDATE codigos SET expirado = 1 WHERE expiraEn < ?', [new Date().toISOString()]);
}

// Configuración del comando
handler.command = ['canjearcodigosb'];
export default handler;
