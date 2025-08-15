"use strict";
const lenguaje = () => { return 'es'; };
const smsAvisoRG = () => { return `RESULTADO\n\n`; };
const smsAvisoAG = () => { return `ADVERTENCIA\n\n`; };
const smsAvisoIIG = () => { return `INFORMACIÓN\n\n`; };
const smsAvisoFG = () => { return `ERROR\n\n`; };
const smsAvisoMG = () => { return `ACCIÓN MAL USADA\n\n`; };
const smsAvisoEEG = () => { return `REPORTE\n\n`; };
const smsAvisoEG = () => { return `ÉXITO\n\n`; };
const smsRowner = () => { return `¡¡ESTE COMANDO SÓLO YO COMO CREADOR(A) DE BOT LO PUEDE USAR!!`; };
const smsOwner = () => { return `¡¡ESTE COMANDO SÓLO MI CREADOR(A) LO PUEDE USAR!!`; };
const smsMods = () => { return `¡¡ESTE COMANDO SÓLO MODERADORES Y MI CREADOR(A) LO PUEDEN USAR!!`; };
const smsPremium = () => { return `¡¡ESTE COMANDO SÓLO ESTA DISPONIBLE PARA USUARIOS PREMIUM Y MI CREADOR(A)!! PARA SER PREMIUM COMPRE UN PASE USANDO #pass premium`; };
const smsGroup = () => { return `¡¡ESTE COMANDO SÓLO SE PUEDE UTILIZAR EN GRUPOS!!`; };
const smsPrivate = () => { return `¡¡ESTE COMANDO SÓLO SE PUEDE UTILIZAR AL PRIVADO!!`; };
const smsAdmin = () => { return `¡¡ESTE COMANDO SÓLO ES PARA ADMINS!!`; };
const smsBotAdmin = () => { return `¡¡NECESITO SER ADMIN PARA QUE PUEDAS USAR ESTE COMANDO!!`; };
const smsUnreg = () => { return `¡¡NECESITAS ESTAR REGISTRADO(A) PARA USAR ESTE COMANDO, ESCRIBE #verificar PARA REGISTRARTE!!`; };
const smsRestrict = () => { return `¡¡ESTE COMANDO ESTÁ RESTRINGIDO POR MI CREADORA(A)!!`; };
const smsTime = () => { return `Tiempo Actual`; };
const smsUptime = () => { return `Funcionando Durante`; };
const smsVersion = () => { return `Versión de ${global.packname}`; };
const smsTotalUsers = () => { return `Total de Usuarios`; };
const smsMode = () => { return `Está en Modo`; };
const smsModePublic = () => { return `PÚBLICO`; };
const smsModePrivate = () => { return `PRIVADO`; };
const smsBanChats = () => { return `Chat(s) Prohibido(s)`; };
const smsBanUsers = () => { return `Usuario(s) Prohibido(s)`; };
const smsPareja = () => { return `Pareja`; };
const smsResultPareja = () => { return `No tiene Pareja`; };
const smsSaludo = () => { return `!HOLA! BIENVENIDO(A)`; };
const smsDia = () => { return `Buenos Días`; };
const smsTarde = () => { return `Buenas Tardes`; };
const smsTarde2 = () => { return `Buenas tardes`; };
const smsNoche = () => { return `Buenas noches`; };
const smsListaMenu = () => { return `LISTA DE MENU`; };
const smsLista1 = () => { return `INFORMACIÓN DE ADMIN-TK`; };
const smsLista2 = () => { return `CREADORA`; };
const smsLista3 = () => { return `DONAR`; };
const smsLista4 = () => { return `VELOCIDAD`; };
const smsLista5 = () => { return `INFORMACIÓN DEL MENÚ`; };
const smsLista6 = () => { return `MENÚ COMPLETO`; };
const smsLista7 = () => { return `INSTALAR ADMIN-TK`; };
const smsLista8 = () => { return `SER SUB BOT`; };
const smsLista9 = () => { return `TÉRMINOS, CONDICIONES Y PRIVACIDAD`; };
const smsLista10 = () => { return `AVENTURA`; };
const smsLista11 = () => { return `TOP GLOBAL`; };
const smsLista12 = () => { return `USUARIOS PREMIUM`; };
const smsLista13 = () => { return `SER USUARIO(A) PREMIUM`; };
const smsLista14 = () => { return `MISIONES DIARIAS`; };
const smsLista15 = () => { return `MENÚ RPG`; };
const smsLista16 = () => { return `TIENDA DE COMPRA Y VENTA`; };
const smsLista17 = () => { return `INVENTARIO`; };
const smsLista18 = () => { return `MULTIMEDIA`; };
const smsLista19 = () => { return `MENÚ DE DESCARGAS`; };
const smsLista20 = () => { return `MENÚ DE BUSQUEDAS`; };
const smsLista21 = () => { return `MENÚ CONVERTIDOR`; };
const smsLista22 = () => { return `MENÚ MODIFICADOR DE AUDIO`; };
const smsLista22_1 = () => { return `MENU DE HERRAMIENTAS`; };
const smsLista23 = () => { return `DIVERSIÓN`; };
const smsLista24 = () => { return `JUEGOS DINÁMICOS`; };
const smsLista25 = () => { return `MENÚ DE AUDIOS`; };
const smsLista26 = () => { return `MENÚ DE STICKERS Y FILTROS`; };
const smsLista27 = () => { return `MENÚ DE EFECTOS Y LOGOS`; };
const smsLista28 = () => { return `MENÚ DE LOGOS 2`; };
const smsLista29 = () => { return `MEMES RANDOMS : ANIME`; };
const smsLista30 = () => { return `MENÚ DE COMANDOS +18`; };
const smsLista31 = () => { return `AJUSTES`; };
const smsLista32 = () => { return `MENÚ PARA GRUPOS`; };
const smsLista33 = () => { return `LISTAS DISPONIBLES`; };
const smsLista34 = () => { return `CENTRO DE CONFIGURACIÓN`; };
const smsLista35 = () => { return `MENÚ PARA PROPIETARIO(A)`; };
const smsWelcome = () => {
    return `* ╭┈⊰* @subject *⊰┈ ✦*
*┊✨ BIENVENIDO(A)!!*
┊💖 @user
┊📄 *LEA LA DESCRIPCIÓN DEL GRUPO*
*╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ✦*
${String.fromCharCode(8206).repeat(850)}
@desc`;
};
const smsBye = () => {
    return `* ╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⊰*
┊ @user
┊ *NO LE SABE AL GRUPO, CHAO!!* 😎
*╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⊰*`;
};
const smsSpromote = () => { return `*@user AHORA ES ADMIN EN ESTE GRUPO!!*`; };
const smsSdemote = () => { return `*@user DEJA DE SER ADMIN EN ESTE GRUPO!!*`; };
const smsSdesc = () => {
    return `*LA NUEVA DESCRIPCIÓN DEL GRUPO ES:*

@desc`;
};
const smsSsubject = () => {
    return `*EL NUEVO NOMBRE DEL GRUPO ES:*

@subject`;
};
const smsSicon = () => { return `*SE HA CAMBIADO LA FOTO DEL GRUPO!!*`; };
const smsSrevoke = () => {
    return `*AHORA ESTE ES EL NUEVO ENLACE DEL GRUPO!!*

*@revoke*`;
};
const smsConexion = () => {
    return `
𓃠 ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦ 🟢 CONEXION ✦┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 𓃠
│
│★ CONEXION EXITOSA CON EL WHATSAPP  😺
│
𓃠 ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦ ✅ ✦┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 𓃠`;
};
const smsCargando = () => {
    return `✨ CARGANDO...
`;
};
const smsCodigoQR = () => {
    return `
✅ ESCANEA EL CÓDIGO QR EXPIRA EN 45 SEGUNDOS ✅`;
};
const smsConexionOFF = () => {
    return `
⚠️ SIN CONEXIÓN, BORRE LA CARPETA ${global.authFile} Y ESCANEA EL CÓDIGO QR ⚠️`;
};
const smsClearTmp = () => {
    return `
╭» 🟢 MULTIMEDIA 🟢
│→ ARCHIVOS DE LA CARPETA TMP ELIMINADAS
╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️`;
};
const smspurgeSession = () => {
    return `
╭» 🔵 ${global.authFile} 🔵
│→ SESIONES NO ESENCIALES ELIMINADAS
╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️`;
};
const smspurgeOldFiles = () => {
    return `
╭» 🟠 ARCHIVOS 🟠
│→ ARCHIVOS RESIDUALES ELIMINADAS
╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️`;
};
const smspurgeSessionSB1 = () => {
    return `
const smspurgeSessionSB1 = () => { return `;
};
Admin - TKJadiBot;
NADA;
POR;
ELIMINAR;
` }`;
const smspurgeSessionSB2 = () => {
    return `
╭» ⚪ Admin-TKJadiBot ⚪
│→ ARCHIVOS NO ESENCIALES ELIMINADOS
╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️`;
};
const smspurgeSessionSB3 = () => {
    return `
╭» 🔴 Admin-TKJadiBot 🔴
│→ OCURRIÓ UN ERROR
╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️
`;
};
const smspurgeOldFiles1 = () => {
    return `
╭» 🟣 ARCHIVO 🟣
│→`;
};
const smspurgeOldFiles2 = () => {
    return `BORRADO CON ÉXITO
╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️`;
};
const smspurgeOldFiles3 = () => {
    return `
╭» 🔴 ARCHIVO 🔴
│→`;
};
const smspurgeOldFiles4 = () => {
    return `NO SE LOGRÓ BORRAR
╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️❌
`;
};
const smsConexioncerrar = () => {
    return `
╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☹
┆ ⚠️ CONEXIÓN CERRADA, RECONECTANDO....
╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☹`;
};
const smsConexionperdida = () => {
    return `
╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☂
┆ ⚠️ CONEXIÓN PERDIDA CON EL SERVIDOR, RECONECTANDO....
╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☂`;
};
const smsConexionreem = () => {
    return `
╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✗
┆ ⚠️ CONEXIÓN REEMPLAZADA, SE HA ABIERTO OTRA NUEVA SESION, POR FAVOR, CIERRA LA SESIÓN ACTUAL PRIMERO.
╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✗`;
};
const smsConexionreinicio = () => {
    return `
╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✓
┆ ❇️ CONECTANDO AL SERVIDOR...
╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✓`;
};
const smsConexiontiem = () => {
    return `
╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ▸
┆ ⌛ TIEMPO DE CONEXIÓN AGOTADO, RECONECTANDO....
╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ▸`;
};
const smsConexiondescon = (reason, connection) => {
    return `
⚠️❗ RAZON DE DESCONEXIÓN DESCONOCIDA: ${reason || ''} >> ${connection || ''}`;
};
const smsMainBot = () => { return " "; };
//# sourceMappingURL=espanol.js.map