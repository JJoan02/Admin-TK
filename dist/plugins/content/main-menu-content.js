export const mainMenuContent = {
    header: (wm, week, date, totalUsers, role, level, isPremium) => `
╭┄〔 *${wm}* 〕┄⊱
┊დ *${week}, ${date}* 
┊დ *Usuarios Totales » ${totalUsers}* 
┊
┊დ *Rol »* ${role}
┊დ *Nivel » ${level}*
┊დ *Premium »* ${isPremium ? '✅' : '❌'}
╰┄┄┄┄〔 *𓃠 GataBot* 〕┄┄┄┄⊱
`,
    infoSection: {
        title: '🌟 INFORMACIÓN GENERAL 🌟',
        totalUsers: (count) => `❰❰ Total Usuarios ❱❱ 
➺ ` ``, $
    }
}, { count };
`` ``,
    registeredUsers;
(registered, total) => `❰❰ Registrados ❱❱ 
➺ ` ``;
$;
{
    registered;
}
/${total}````,;
uptime: (time) => `❰❰ Tiempo Activo ❱❱ 
➺ ` ``;
$;
{
    time;
}
`` ``,
    version;
(version) => `❰❰ Versión ❱❱ 
➺ ` ``;
$;
{
    version;
}
`` ``,
    mode;
(isSelf, privateText, publicText) => `❰❰ Modo ❱❱ 
➺ `;
$;
{
    isSelf ? privateText : publicText;
}
``,
    bannedChats;
(count) => `❰❰ Chats Baneados ❱❱ 
➺ ` ``;
$;
{
    count;
}
`` ``,
    bannedUsers;
(count) => `❰❰ Usuarios Baneados ❱❱ 
➺ ` ``;
$;
{
    count;
}
`` ``,
;
userInfoSection: {
    title: '✨ INFORMACIÓN DEL USUARIO ✨',
        registrationType;
    (isRegistered, registrationComplete) => {
        if (isRegistered) {
            return registrationComplete ? '🗂️ Registro Completo' : '📑 Registro Rápido';
        }
        return '❌ Sin registro';
    },
        myStatus;
    (status, usedPrefix) => {
        if (status && typeof status === 'string') {
            return `_Me siento ${status}_`;
        }
        return `❌ *Establecer usando:* _${usedPrefix}miestado_`;
    },
        verified;
    (isRegistered, usedPrefix) => {
        if (isRegistered) {
            return '✅ Verificado';
        }
        return `❌ *Establecer registro usando:* _${usedPrefix}verificar_`;
    },
        premiumStatus;
    (isPremium, usedPrefix) => {
        if (isPremium) {
            return '✅ Eres usuario Premium';
        }
        return `❌ *Establecer Premium:* _${usedPrefix}pase premium_`;
    },
        role;
    (role) => `❰❰ Rol ❱❱ 
➺ ${role}`,
        level;
    (emoji, currentExp, maxExp) => `❰❰ Nivel ❱❱
➺ ${emoji} ` ``;
    $;
    {
        currentExp;
    }
    /${maxExp}````,;
    partner: (partnerName, userName, defaultText) => {
        if (partnerName) {
            return `${userName} 💕 ${partnerName}`;
        }
        return `🛐 ${defaultText}`;
    },
        hobby;
    (hobby) => {
        if (hobby && hobby !== '0') {
            return hobby;
        }
        return '*Sin Registro*';
    },
    ;
}
sections: {
    info: {
        title: 'INFORMACIÓN',
            commands;
        [
            { command: 'cuentasgatabot , accounts', description: false, context: 'Cuentas oficiales', showPrefix: true },
            { command: 'grupos , linkgc', description: false, context: 'Grupos oficiales', showPrefix: true },
            { command: 'donar , donate', description: false, context: 'Apoya al proyecto donando', showPrefix: true },
            { command: 'listagrupos , grouplist', description: false, context: 'Grupos en donde estoy', showPrefix: true },
            { command: 'estado , status', description: false, context: 'Información de mí estado', showPrefix: true },
            { command: 'infogata , infobot', description: false, context: 'Información sobre el Bot', showPrefix: true },
            { command: 'instalarbot , installbot', description: false, context: 'Información y métodos de instalación', showPrefix: true },
            { command: 'creadora , owner', description: false, context: 'Información sobre mí Creadora', showPrefix: true },
            { command: 'velocidad , ping', description: false, context: 'Verifica la velocidad de este Bot', showPrefix: true },
            { command: 'Bot', description: false, context: 'Mensaje predeterminado del Bot', showPrefix: false },
            { command: 'términos y condiciones , terms and conditions', description: false, context: 'Revisa detalles al usar este Bot', showPrefix: false },
        ];
    }
    jadiBot: {
        title: 'COMANDOS - SUB BOT',
            commands;
        [
            { command: 'serbot , jadibot', description: false, context: 'Reactiva o Conviértete en Bot secundario', showPrefix: true },
            { command: 'serbot --code , jadibot --code', description: false, context: 'Solicita código de 8 dígitos', showPrefix: true },
            { command: 'detener , stop', description: false, context: 'Dejar de ser temporalmente Sub Bot', showPrefix: true },
            { command: 'bots , listjadibots', description: false, context: 'Lista de Bots secundarios', showPrefix: true },
            { command: 'borrarsesion , delsession', description: false, context: 'Borrar datos de Bot secuandario', showPrefix: true },
            { command: 'bcbot', description: false, context: 'Notificar a usuarios Sub Bots', showPrefix: true },
        ];
    }
    report: {
        title: 'REPORTAR COMANDOS',
            commands;
        [
            { command: 'reporte , report', description: '[texto] || [text]', context: 'Reportar comandos con errores', showPrefix: true },
        ];
    }
    link: {
        title: 'GATABOT TEMPORAL',
            commands;
        [
            { command: 'botemporal , addbot', description: '[enlace] [cantidad] || [link] [amount]', context: 'Agregar Bot temporalmente a un grupo', showPrefix: true },
        ];
    }
    premium: {
        title: 'SER PREMIUM',
            commands;
        [
            { command: 'pase premium , pass premium', description: false, context: 'Planes para adquirir premium', showPrefix: true },
            { command: 'listavip , listprem', description: false, context: 'Usuarios con tiempo premium', showPrefix: true },
            { command: 'listapremium , listpremium', description: false, context: 'Lista de usuarios premium', showPrefix: true },
        ];
    }
    games: {
        title: 'JUEGOS',
            commands;
        [
            { command: 'matematicas , math', description: '"noob, medium, hard"', context: 'Operaciones matemáticas 🧮', showPrefix: true },
            { command: 'lanzar , launch', description: '"cara" o "cruz"', context: 'Moneda de la suerte 🪙', showPrefix: true },
            { command: 'ppt', description: '"piedra", "papel" o "tijera"', context: 'Un clásico 🪨📄✂️', showPrefix: true },
            { command: 'ttt', description: '[Nombre de la sala] || [Room name]', context: 'Tres en línea/rayas ❌⭕', showPrefix: true },
            { command: 'delttt', description: false, context: 'Cerrar/abandonar la partida 🚪', showPrefix: true },
            { command: 'topgays', description: false, context: 'Clasificación de usuarios Gays 🏳️‍🌈', showPrefix: true },
            { command: 'topotakus', description: false, context: 'Clasificación de usuarios Otakus 🎌', showPrefix: true },
            { command: 'toppajer@s', description: false, context: 'Clasificación de usuarios pajeros 🥵', showPrefix: true },
            { command: 'topintegrantes', description: false, context: 'Mejores usuarios 👑', showPrefix: true },
            { command: 'toplagrasa', description: false, context: 'Usuarios más grasosos XD', showPrefix: true },
            { command: 'toplind@s', description: false, context: 'Los más lindos 😻', showPrefix: true },
            { command: 'topput@s', description: false, context: 'Los más p**** 🫣', showPrefix: true },
            { command: 'toppanafrescos', description: false, context: 'Los que más critican 🗿', showPrefix: true },
            { command: 'topshiposters', description: false, context: 'Los que se creen graciosos 🤑', showPrefix: true },
            { command: 'topfamosos', description: false, context: 'Los más conocidos ☝️', showPrefix: true },
            { command: 'topparejas', description: false, context: 'Las 5 mejores 💕', showPrefix: true },
            { command: 'gay', description: '[@tag]', context: 'Perfil Gay 😲', showPrefix: true },
            { command: 'gay2', description: '[@tag] o [nombre] || [@tag] or [name]', context: '(%) de Gay', showPrefix: true },
            { command: 'lesbiana', description: '[@tag] o [nombre] || [@tag] or [name]', context: '(%) de Lesbiana', showPrefix: true },
            { command: 'manca', description: '[@tag] o [nombre] || [@tag] or [name]', context: '(%) de Manca', showPrefix: true },
            { command: 'manco', description: '[@tag] o [nombre] || [@tag] or [name]', context: '(%) de Manco', showPrefix: true },
            { command: 'pajero', description: '[@tag] o [nombre] || [@tag] or [name]', context: '(%) de Pajero', showPrefix: true },
            { command: 'pajera', description: '[@tag] o [nombre] || [@tag] or [name]', context: '(%) de Pajera', showPrefix: true },
            { command: 'puto', description: '[@tag] o [nombre] || [@tag] or [name]', context: '(%) de Puto', showPrefix: true },
            { command: 'puta', description: '[@tag] o [nombre] || [@tag] or [name]', context: '(%) de Puta', showPrefix: true },
            { command: 'rata', description: '[@tag] o [nombre] || [@tag] or [name]', context: '(%) de Rata', showPrefix: true },
            { command: 'love', description: '[@tag] o [nombre] || [@tag] or [name]', context: '(%) de Love', showPrefix: true },
            { command: 'doxxear', description: '[@tag]', context: 'Simular Doxxeo falso 🕵️‍♀️', showPrefix: true },
            { command: 'pregunta', description: '[texto] || [text]', context: 'Pregunta ❔ y responderá', showPrefix: true },
            { command: 'apostar , slot', description: '[cantidad] || [amount]', context: 'Apuesta a la suerte 🎰', showPrefix: true },
            { command: 'formarpareja', description: false, context: 'Une a dos personas 💞', showPrefix: true },
            { command: 'dado', description: false, context: 'Envía un dado aleatorio 🎲', showPrefix: true },
            { command: 'piropo', description: false, context: 'Enviar un piropo 🫢', showPrefix: true },
            { command: 'chiste', description: false, context: 'Envía chistes 🤡', showPrefix: true },
            { command: 'reto', description: false, context: 'Pondrá un reto 😏', showPrefix: true },
            { command: 'frases', description: '[cantidad 1 al 99] || [amount 1-99]', context: 'Envía frases aleatorias 💐', showPrefix: true },
            { command: 'acertijo', description: false, context: 'Responde al mensaje del acertijo 👻', showPrefix: true },
            { command: 'cancion', description: false, context: 'Adivina la canción 🎼', showPrefix: true },
            { command: 'trivia', description: false, context: 'Preguntas con opciones 💭', showPrefix: true },
            { command: 'pelicula', description: false, context: 'Descubre la película con emojis 🎬', showPrefix: true },
            { command: 'adivinanza', description: false, context: 'Adivina adivinador 🧞‍♀️', showPrefix: true },
            { command: 'ruleta', description: false, context: 'Suerte inesperada 💫', showPrefix: true },
            { command: 'ahorcado', description: false, context: 'Adivina la palabras antes de que el ahorcado te atrape 😱', showPrefix: true },
            { command: 'ruletadelban', description: false, context: 'Elimina un usuario al azar, solo para admins ☠️', showPrefix: true }
        ];
    }
    ai: {
        title: 'IA',
            commands;
        [
            { command: 'simi , simsimi', description: '[texto] || [text]', context: 'Conversa con SimSimi', showPrefix: true },
            { command: 'ia , ai', description: '[texto] || [text]', context: 'Tecnología de ChatGPT', showPrefix: true },
            { command: 'delchatgpt', description: false, context: 'Eliminar historial de la IA', showPrefix: true },
            { command: 'iavoz , aivoice', description: '[texto] || [text]', context: 'Respuestas en audios', showPrefix: true },
            { command: 'calidadimg , qualityimg', description: '(responde con una imagen) || (responds with an image)', context: 'Detalles de resolución de imagen', showPrefix: true },
            { command: 'dalle', description: '[texto] || [text]', context: 'Genera imagen a partir de texto', showPrefix: true },
            { command: 'gemini', description: '[texto] || [text]', context: 'IA, Tecnología de Google', showPrefix: true },
            { command: 'geminimg', description: '(imagen) + [texto] || (image) + [text]', context: 'Busca información de una imagen', showPrefix: true },
            { command: 'hd', description: '(responde con una imagen) || (responds with an image)', context: 'Mejorar calidad de imagen', showPrefix: true },
        ];
    }
    settings: {
        title: 'AJUSTES',
            groupSettingsInfo;
        'Para ver la configuración completa sólo use: *${usedPrefix}on* o *${usedPrefix}off*',
            commands;
        [
            { comando: (botRestrict) => (botRestrict ? 'off ' : 'on ') + 'restringir , restrict', descripcion: (botRestrict) => botRestrict ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Permisos para el Bot', showPrefix: true },
            { comando: (botAntiCall) => (botAntiCall ? 'off ' : 'on ') + 'antillamar , anticall', descripcion: (botAntiCall) => botAntiCall ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Evitar recibir llamadas en el Bot', showPrefix: true },
            { comando: (botTemporal) => (botTemporal ? 'off ' : 'on ') + 'temporal', descripcion: (botTemporal) => botTemporal ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Ingreso del Bot temporalmente en grupos', showPrefix: true },
            { comando: (botJadibotMd) => (botJadibotMd ? 'off ' : 'on ') + 'serbot , jadibot', descripcion: (botJadibotMd) => botJadibotMd ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Permitir o no Sub Bots en este Bot', showPrefix: true },
            { comando: (botAntiSpam) => (botAntiSpam ? 'off ' : 'on ') + 'antispam', descripcion: (botAntiSpam) => botAntiSpam ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Dar advertencia por hacer Spam', showPrefix: true },
            { comando: (botAntiSpam2) => (botAntiSpam2 ? 'off ' : 'on ') + 'antispam2', descripcion: (botAntiSpam2) => botAntiSpam2 ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Omitir resultado de comandos consecutivos', showPrefix: true },
            { comando: (botAntiPrivate) => (botAntiPrivate ? 'off ' : 'on ') + 'antiprivado , antiprivate', descripcion: (botAntiPrivate) => botAntiPrivate ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Prohibe que este Bot sea usado en privado', showPrefix: true },
            { comando: (globalSelf) => (globalSelf ? 'on ' : 'off ') + 'publico , public', descripcion: (globalSelf) => globalSelf ? '❌ Desactivado || Disabled' : '✅ Activado || Activated', contexto: 'Permitir que todos usen el Bot', showPrefix: true },
            { comando: (globalAutoread) => (globalAutoread ? 'off ' : 'on ') + 'autovisto , autoread', descripcion: (globalAutoread) => globalAutoread ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Mensajes leídos automáticamente', showPrefix: true },
            { comando: (globalGconly) => (globalGconly ? 'off ' : 'on ') + 'sologrupos , gconly', descripcion: (globalGconly) => globalGconly ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Hacer que funcione sólo en grupos', showPrefix: true },
            { comando: (globalPconly) => (globalPconly ? 'off ' : 'on ') + 'soloprivados , pconly', descripcion: (globalPconly) => globalPconly ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Hacer que funcione sólo al privado', showPrefix: true },
            { comando: (chatWelcome) => (chatWelcome ? 'off ' : 'on ') + 'bienvenida , welcome', descripcion: (chatWelcome) => chatWelcome ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Establecer bienvenida en grupos', showPrefix: true },
            { comando: (chatDetect) => (chatDetect ? 'off ' : 'on ') + 'avisos , detect', descripcion: (chatDetect) => chatDetect ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Avisos importantes en grupos', showPrefix: true },
            { comando: (chatAutolevelup) => (chatAutolevelup ? 'off ' : 'on ') + 'autonivel , autolevelup', descripcion: (chatAutolevelup) => chatAutolevelup ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Subir de nivel automáticamente', showPrefix: true },
            { comando: (chatModoadmin) => (chatModoadmin ? 'off ' : 'on ') + 'modoadmin , modeadmin', descripcion: (chatModoadmin) => chatModoadmin ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Sólo admins podrán usar en grupo', showPrefix: true },
            { comando: (chatStickers) => (chatStickers ? 'off ' : 'on ') + 'stickers', descripcion: (chatStickers) => chatStickers ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Stickers automáticos en chats', showPrefix: true },
            { comando: (chatAutosticker) => (chatAutosticker ? 'off ' : 'on ') + 'autosticker', descripcion: (chatAutosticker) => chatAutosticker ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Multimedia a stickers automáticamente', showPrefix: true },
            { comando: (chatReaction) => (chatReaction ? 'off ' : 'on ') + 'reacciones , reaction', descripcion: (chatReaction) => chatReaction ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Reaccionar a mensajes automáticamente', showPrefix: true },
            { comando: (chatAudios) => (chatAudios ? 'off ' : 'on ') + 'audios', descripcion: (chatAudios) => chatAudios ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Audios automáticos en chats', showPrefix: true },
            { comando: (chatModohorny) => (chatModohorny ? 'off ' : 'on ') + 'modocaliente , modehorny', descripcion: (chatModohorny) => chatModohorny ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Comandos con contenido para adultos', showPrefix: true },
            { comando: (chatAntitoxic) => (chatAntitoxic ? 'off ' : 'on ') + 'antitoxicos , antitoxic', descripcion: (chatAntitoxic) => chatAntitoxic ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Sancionar/eliminar a usuarios tóxicos', showPrefix: true },
            { comando: (chatAntiver) => (chatAntiver ? 'off ' : 'on ') + 'antiver , antiviewonce', descripcion: (chatAntiver) => chatAntiver ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: ' No acultar mensajes de "una sola vez"', showPrefix: true },
            { comando: (chatDelete) => (chatDelete ? 'off ' : 'on ') + 'antieliminar , antidelete', descripcion: (chatDelete) => chatDelete ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Mostrar mensajes eliminados', showPrefix: true },
            { comando: (chatAntifake) => (chatAntifake ? 'off ' : 'on ') + 'antifalsos , antifake', descripcion: (chatAntifake) => chatAntifake ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Eliminar usuarios falsos/extranjeros', showPrefix: true },
            { comando: (chatAntiTraba) => (chatAntiTraba ? 'off ' : 'on ') + 'antitrabas , antilag', descripcion: (chatAntiTraba) => chatAntiTraba ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Enviar mensaje automático en caso de lag', showPrefix: true },
            { comando: (chatSimi) => (chatSimi ? 'off ' : 'on ') + 'simi', descripcion: (chatSimi) => chatSimi ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'SimSimi responderá automáticamente', showPrefix: true },
            { comando: (chatModoia) => (chatModoia ? 'off ' : 'on ') + 'ia', descripcion: (chatModoia) => chatModoia ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Inteligencia artificial automática', showPrefix: true },
            { comando: (chatAntilink) => (chatAntilink ? 'off ' : 'on ') + 'antienlace , antilink', descripcion: (chatAntilink) => chatAntilink ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Eliminar enlaces de WhatsApp', showPrefix: true },
            { comando: (chatAntilink2) => (chatAntilink2 ? 'off ' : 'on ') + 'antienlace2 , antilink2', descripcion: (chatAntilink2) => chatAntilink2 ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Eliminar enlaces que contenga "https"', showPrefix: true },
            { comando: (chatAntiTiktok) => (chatAntiTiktok ? 'off ' : 'on ') + 'antitiktok , antitk', descripcion: (chatAntiTiktok) => chatAntiTiktok ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Eliminar enlaces de TikTok', showPrefix: true },
            { comando: (chatAntiYoutube) => (chatAntiYoutube ? 'off ' : 'on ') + 'antiyoutube , antiyt', descripcion: (chatAntiYoutube) => chatAntiYoutube ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Eliminar enlaces de YouTube', showPrefix: true },
            { comando: (chatAntiTelegram) => (chatAntiTelegram ? 'off ' : 'on ') + 'antitelegram , antitg', descripcion: (chatAntiTelegram) => chatAntiTelegram ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Eliminar enlaces de Telegram', showPrefix: true },
            { comando: (chatAntiFacebook) => (chatAntiFacebook ? 'off ' : 'on ') + 'antifacebook , antifb', descripcion: (chatAntiFacebook) => chatAntiFacebook ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Eliminar enlaces de Facebook', showPrefix: true },
            { comando: (chatAntiInstagram) => (chatAntiInstagram ? 'off ' : 'on ') + 'antinstagram , antig', descripcion: (chatAntiInstagram) => chatAntiInstagram ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Eliminar enlaces de Instagram', showPrefix: true },
            { comando: (chatAntiTwitter) => (chatAntiTwitter ? 'off ' : 'on ') + 'antiX', descripcion: (chatAntiTwitter) => chatAntiTwitter ? '✅ Activado || Activated' : '❌ Desactivado || Disabled', contexto: 'Eliminar enlaces de X (Twitter)', showPrefix: true },
        ];
    }
    groupSettings: {
        title: 'AJUSTES/INFO - GRUPO',
            commands;
        [
            { command: 'configuracion', description: false, context: false, showPrefix: true },
            { command: 'settings', description: false, context: false, showPrefix: true },
            { command: 'vergrupo', description: false, context: false, showPrefix: true },
        ];
    }
    downloads: {
        title: 'DESCARGAS',
            commands;
        [
            { command: 'imagen | image', description: '*texto*', context: false, showPrefix: true },
            { command: 'pinterest | dlpinterest', description: '*texto*', context: false, showPrefix: true },
            { command: 'wallpaper|wp', description: '*texto*', context: false, showPrefix: true },
            { command: 'play | play2', description: '*texto o link*', context: false, showPrefix: true },
            { command: 'play.1', description: '*texto o link*', context: false, showPrefix: true },
            { command: 'play.2', description: '*texto o link*', context: false, showPrefix: true },
            { command: 'ytmp3 | yta', description: '*link*', context: false, showPrefix: true },
            { command: 'ytmp4 | ytv', description: '*link*', context: false, showPrefix: true },
            { command: 'pdocaudio | ytadoc', description: '*link*', context: false, showPrefix: true },
            { command: 'pdocvieo | ytvdoc', description: '*link*', context: false, showPrefix: true },
            { command: 'tw | twdl | twitter', description: '*link*', context: false, showPrefix: true },
            { command: 'spotify | music', description: '*text*', context: false, showPrefix: true },
            { command: 'facebook | fb', description: '*link*', context: false, showPrefix: true },
            { command: 'instagram', description: '*link video o imagen*', context: false, showPrefix: true },
            { command: 'verig | igstalk', description: '*usuario(a)*', context: false, showPrefix: true },
            { command: 'ighistoria | igstory', description: '*usuario(a)*', context: false, showPrefix: true },
            { command: 'tiktok', description: '*link*', context: false, showPrefix: true },
            { command: 'tiktokimagen | ttimagen', description: '*link*', context: false, showPrefix: true },
            { command: 'tiktokfoto | tiktokphoto', description: '*usuario(a)*', context: false, showPrefix: true },
            { command: 'vertiktok | tiktokstalk', description: '*usuario(a)*', context: false, showPrefix: true },
            { command: 'mediafire | dlmediafire', description: '*link*', context: false, showPrefix: true },
            { command: 'clonarepo | gitclone', description: '*link*', context: false, showPrefix: true },
            { command: 'clima', description: '*país ciudad*', context: false, showPrefix: true },
            { command: 'consejo', description: false, context: false, showPrefix: true },
            { command: 'frase', description: false, context: false, showPrefix: true },
            { command: 'frase2', description: false, context: false, showPrefix: true },
            { command: 'morse codificar', description: '*texto*', context: false, showPrefix: true },
            { command: 'morse decodificar', description: '*morse*', context: false, showPrefix: true },
            { command: 'drive | dldrive', description: '*link*', context: false, showPrefix: true },
        ];
    }
    anonymousChat: {
        title: 'CHAT ANONIMO',
            commands;
        [
            { command: 'chatanonimo | anonimochat', description: false, context: false, showPrefix: true },
            { command: 'anonimoch', description: false, context: false, showPrefix: true },
            { command: 'start', description: false, context: false, showPrefix: true },
            { command: 'next', description: false, context: false, showPrefix: true },
            { command: 'leave', description: false, context: false, showPrefix: true },
        ];
    }
    groupCommands: {
        title: 'COMANDOS PARA GRUPOS',
            commands;
        [
            { command: 'add', description: '*numero*', context: false, showPrefix: true },
            { command: 'mute | unmute', description: '*@tag*', context: false, showPrefix: true },
            { command: 'sacar | ban | kick', description: '*@tag*', context: false, showPrefix: true },
            { command: 'grupo', description: '*abrir o cerrar*', context: false, showPrefix: true },
            { command: 'group', description: '*open o close*', context: false, showPrefix: true },
            { command: 'daradmin | promote', description: '*@tag*', context: false, showPrefix: true },
            { command: 'quitar | demote', description: '*@tag*', context: false, showPrefix: true },
            { command: 'banchat', description: false, context: false, showPrefix: true },
            { command: 'unbanchat', description: false, context: false, showPrefix: true },
            { command: 'banuser', description: '*@tag*', context: false, showPrefix: true },
            { command: 'unbanuser', description: '*@tag*', context: false, showPrefix: true },
            { command: 'admins', description: '*texto*', context: false, showPrefix: true },
            { command: 'invocar', description: '*texto*', context: false, showPrefix: true },
            { command: 'tagall', description: '*texto*', context: false, showPrefix: true },
            { command: 'hidetag', description: '*texto*', context: false, showPrefix: true },
            { command: 'infogrupo | infogroup', description: false, context: false, showPrefix: true },
            { command: 'grupotiempo | grouptime', description: '*Cantidad*', context: false, showPrefix: true },
            { command: 'advertencia', description: '*@tag*', context: false, showPrefix: true },
            { command: 'deladvertencia', description: '*@tag*', context: false, showPrefix: true },
            { command: 'delwarn', description: '*@tag*', context: false, showPrefix: true },
            { command: 'crearvoto | startvoto', description: '*texto*', context: false, showPrefix: true },
            { command: 'sivotar | upvote', description: false, context: false, showPrefix: true },
            { command: 'novotar | devote', description: false, context: false, showPrefix: true },
            { command: 'vervotos | cekvoto', description: false, context: false, showPrefix: true },
            { command: 'delvoto | deletevoto', description: false, context: false, showPrefix: true },
            { command: 'enlace | link', description: false, context: false, showPrefix: true },
            { command: 'newnombre | nuevonombre', description: '*texto*', context: false, showPrefix: true },
            { command: 'newdesc | descripcion', description: '*texto*', context: false, showPrefix: true },
            { command: 'setwelcome | bienvenida', description: '*texto*', context: false, showPrefix: true },
            { command: 'setbye | despedida', description: '*texto*', context: false, showPrefix: true },
            { command: 'nuevoenlace | resetlink', description: false, context: false, showPrefix: true },
            { command: 'on', description: false, context: false, showPrefix: true },
            { command: 'off', description: false, context: false, showPrefix: true },
        ];
    }
    couples: {
        title: 'PAREJAS',
            commands;
        [
            { command: 'listaparejas | listship', description: false, context: false, showPrefix: true },
            { command: 'mipareja | mylove', description: false, context: false, showPrefix: true },
            { command: 'pareja | couple', description: '*@tag*', context: false, showPrefix: true },
            { command: 'aceptar | accept', description: '*@tag*', context: false, showPrefix: true },
            { command: 'rechazar | decline', description: '*@tag*', context: false, showPrefix: true },
            { command: 'terminar | finish', description: '*@tag*', context: false, showPrefix: true },
        ];
    }
    voting: {
        title: 'VOTACIONES EN GRUPOS',
            commands;
        [
            { command: 'crearvoto | startvoto', description: '*texto*', context: false, showPrefix: true },
            { command: 'sivotar | upvote', description: false, context: false, showPrefix: true },
            { command: 'novotar | devote', description: false, context: false, showPrefix: true },
            { command: 'vervotos | cekvoto', description: false, context: false, showPrefix: true },
            { command: 'delvoto | deletevoto', description: false, context: false, showPrefix: true },
        ];
    }
    nsfw: {
        title: 'CONTENIDO',
            commands;
        [
            { command: 'hornymenu', description: false, context: false, showPrefix: true },
        ];
    }
    converters: {
        title: 'CONVERTIDORES',
            commands;
        [
            { command: 'toimg | img | jpg', description: '*sticker*', context: false, showPrefix: true },
            { command: 'toanime | jadianime', description: '*foto*', context: false, showPrefix: true },
            { command: 'tomp3 | mp3', description: '*video o nota de voz*', context: false, showPrefix: true },
            { command: 'tovn | vn', description: '*video o audio*', context: false, showPrefix: true },
            { command: 'tovideo', description: '*audio*', context: false, showPrefix: true },
            { command: 'tourl', description: '*video, imagen*', context: false, showPrefix: true },
            { command: 'toenlace', description: '*video, imagen o audio*', context: false, showPrefix: true },
            { command: 'tts es', description: '*texto*', context: false, showPrefix: true },
        ];
    }
    logos: {
        title: 'LOGOS',
            commands;
        [
            { command: 'logos', description: '*efecto texto*', context: false, showPrefix: true },
            { command: 'menulogos2', description: false, context: false, showPrefix: true },
        ];
    }
    effects: {
        title: 'EFECTOS',
            commands;
        [
            { command: 'simpcard', description: '*@tag*', context: false, showPrefix: true },
            { command: 'hornycard', description: '*@tag*', context: false, showPrefix: true },
            { command: 'lolice', description: '*@tag*', context: false, showPrefix: true },
            { command: 'ytcomment', description: '*texto*', context: false, showPrefix: true },
            { command: 'itssostupid', description: false, context: false, showPrefix: true },
            { command: 'pixelar', description: false, context: false, showPrefix: true },
            { command: 'blur', description: false, context: false, showPrefix: true },
        ];
    }
    randomAnime: {
        title: 'RANDOM/ANIME',
            commands;
        [
            { command: 'chica', description: false, context: false, showPrefix: true },
            { command: 'chico', description: false, context: false, showPrefix: true },
            { command: 'cristianoronaldo', description: false, context: false, showPrefix: true },
            { command: 'messi', description: false, context: false, showPrefix: true },
            { command: 'meme', description: false, context: false, showPrefix: true },
            { command: 'meme2', description: false, context: false, showPrefix: true },
            { command: 'itzy', description: false, context: false, showPrefix: true },
            { command: 'blackpink', description: false, context: false, showPrefix: true },
            { command: 'kpop', description: '*blackpink, o exo, o bts*', context: false, showPrefix: true },
            { command: 'lolivid', description: false, context: false, showPrefix: true },
            { command: 'loli', description: false, context: false, showPrefix: true },
            { command: 'navidad', description: false, context: false, showPrefix: true },
            { command: 'ppcouple', description: false, context: false, showPrefix: true },
            { command: 'neko', description: false, context: false, showPrefix: true },
            { command: 'waifu', description: false, context: false, showPrefix: true },
            { command: 'akira', description: false, context: false, showPrefix: true },
            { command: 'akiyama', description: false, context: false, showPrefix: true },
            { command: 'anna', description: false, context: false, showPrefix: true },
            { command: 'asuna', description: false, context: false, showPrefix: true },
            { command: 'ayuzawa', description: false, context: false, showPrefix: true },
            { command: 'boruto', description: false, context: false, showPrefix: true },
            { command: 'chiho', description: false, context: false, showPrefix: true },
            { command: 'chitoge', description: false, context: false, showPrefix: true },
            { command: 'deidara', description: false, context: false, showPrefix: true },
            { command: 'erza', description: false, context: false, showPrefix: true },
            { command: 'elaina', description: false, context: false, showPrefix: true },
            { command: 'eba', description: false, context: false, showPrefix: true },
            { command: 'emilia', description: false, context: false, showPrefix: true },
            { command: 'hestia', description: false, context: false, showPrefix: true },
            { command: 'hinata', description: false, context: false, showPrefix: true },
            { command: 'inori', description: false, context: false, showPrefix: true },
            { command: 'isuzu', description: false, context: false, showPrefix: true },
            { command: 'itachi', description: false, context: false, showPrefix: true },
            { command: 'itori', description: false, context: false, showPrefix: true },
            { command: 'kaga', description: false, context: false, showPrefix: true },
            { command: 'kagura', description: false, context: false, showPrefix: true },
            { command: 'kaori', description: false, context: false, showPrefix: true },
            { command: 'keneki', description: false, context: false, showPrefix: true },
            { command: 'kotori', description: false, context: false, showPrefix: true },
            { command: 'kurumi', description: false, context: false, showPrefix: true },
            { command: 'madara', description: false, context: false, showPrefix: true },
            { command: 'mikasa', description: false, context: false, showPrefix: true },
            { command: 'miku', description: false, context: false, showPrefix: true },
            { command: 'minato', description: false, context: false, showPrefix: true },
            { command: 'naruto', description: false, context: false, showPrefix: true },
            { command: 'nezuko', description: false, context: false, showPrefix: true },
            { command: 'sagiri', description: false, context: false, showPrefix: true },
            { command: 'sasuke', description: false, context: false, showPrefix: true },
            { command: 'sakura', description: false, context: false, showPrefix: true },
            { command: 'cosplay', description: false, context: false, showPrefix: true },
        ];
    }
    audioEffects: {
        title: 'EFECTO DE AUDIO',
            commands;
        [
            { command: 'bass', description: false, context: false, showPrefix: true },
            { command: 'blown', description: false, context: false, showPrefix: true },
            { command: 'deep', description: false, context: false, showPrefix: true },
            { command: 'earrape', description: false, context: false, showPrefix: true },
            { command: 'fast', description: false, context: false, showPrefix: true },
            { command: 'fat', description: false, context: false, showPrefix: true },
            { command: 'nightcore', description: false, context: false, showPrefix: true },
            { command: 'reverse', description: false, context: false, showPrefix: true },
            { command: 'robot', description: false, context: false, showPrefix: true },
            { command: 'slow', description: false, context: false, showPrefix: true },
            { command: 'smooth', description: false, context: false, showPrefix: true },
            { command: 'tupai', description: false, context: false, showPrefix: true },
        ];
    }
    search: {
        title: 'BÚSQUEDAS',
            commands;
        [
            { command: 'animeinfo', description: '*texto*', context: false, showPrefix: true },
            { command: 'mangainfo', description: '*texto*', context: false, showPrefix: true },
            { command: 'google', description: '*texto*', context: false, showPrefix: true },
            { command: 'googlelyrics', description: '*texto*', context: false, showPrefix: true },
            { command: 'letra | lirik', description: '*texto*', context: false, showPrefix: true },
            { command: 'ytsearch | yts', description: '*texto*', context: false, showPrefix: true },
            { command: 'wiki | wikipedia', description: '*texto*', context: false, showPrefix: true },
        ];
    }
    audios: {
        title: 'AUDIOS',
            commands;
        [
            { command: 'audios', description: false, context: false, showPrefix: true },
        ];
    }
    tools: {
        title: 'HERRAMIENTAS',
            commands;
        [
            { command: 'afk', description: '*motivo*', context: false, showPrefix: true },
            { command: 'acortar', description: '*url*', context: false, showPrefix: true },
            { command: 'calc', description: '*operacion math*', context: false, showPrefix: true },
            { command: 'del', description: '*respondre a mensaje del Bot*', context: false, showPrefix: true },
            { command: 'qrcode', description: '*texto*', context: false, showPrefix: true },
            { command: 'readmore', description: '*texto1|texto2*', context: false, showPrefix: true },
            { command: 'spamwa', description: '*numero|texto|cantidad*', context: false, showPrefix: true },
            { command: 'styletext', description: '*texto*', context: false, showPrefix: true },
            { command: 'traducir', description: '*texto*', context: false, showPrefix: true },
            { command: 'morse codificar', description: '*texto*', context: false, showPrefix: true },
            { command: 'morse decodificar', description: '*morse*', context: false, showPrefix: true },
            { command: 'encuesta | poll', description: '*Motivo*', context: false, showPrefix: true },
            { command: 'horario', description: false, context: false, showPrefix: true },
        ];
    }
    rpg: {
        title: 'RPG',
            commands;
        [
            { command: 'botemporal', description: '*enlace* *cantidad*', context: false, showPrefix: true },
            { command: 'addbot', description: '*enlace* *cantidad*', context: false, showPrefix: true },
            { command: 'pase premium', description: false, context: false, showPrefix: true },
            { command: 'pass premium', description: false, context: false, showPrefix: true },
            { command: 'listapremium | listprem', description: false, context: false, showPrefix: true },
            { command: 'transfer', description: '*tipo cantidad @tag*', context: false, showPrefix: true },
            { command: 'dar', description: '*tipo cantidad @tag*', context: false, showPrefix: true },
            { command: 'enviar', description: '*tipo cantidad @tag*', context: false, showPrefix: true },
            { command: 'balance', description: false, context: false, showPrefix: true },
            { command: 'cartera | wallet', description: false, context: false, showPrefix: true },
            { command: 'experiencia | exp', description: false, context: false, showPrefix: true },
            { command: 'top | lb | leaderboard', description: false, context: false, showPrefix: true },
            { command: 'nivel | level | lvl', description: false, context: false, showPrefix: true },
            { command: 'rol | rango', description: false, context: false, showPrefix: true },
            { command: 'inventario | inventory', description: false, context: false, showPrefix: true },
            { command: 'aventura | adventure', description: false, context: false, showPrefix: true },
            { command: 'caza | cazar | hunt', description: false, context: false, showPrefix: true },
            { command: 'pescar | fishing', context: false, showPrefix: true },
            { command: 'animales', description: false, context: false, showPrefix: true },
            { command: 'alimentos', description: false, context: false, showPrefix: true },
            { command: 'curar | heal', description: false, context: false, showPrefix: true },
            { command: 'buy', description: false, context: false, showPrefix: true },
            { command: 'sell', description: false, context: false, showPrefix: true },
            { command: 'verificar | registrar', description: false, context: false, showPrefix: true },
            { command: 'perfil | profile', description: false, context: false, showPrefix: true },
            { command: 'myns', description: false, context: false, showPrefix: true },
            { command: 'unreg', description: '*numero de serie*', context: false, showPrefix: true },
            { command: 'minardiamantes | minargemas', description: false, context: false, showPrefix: true },
            { command: 'minargatacoins | minarcoins', description: false, context: false, showPrefix: true },
            { command: 'minarexperiencia | minarexp', description: false, context: false, showPrefix: true },
            { command: 'minar', description: '*:* minar2 *:* minar3', context: false, showPrefix: true },
            { command: 'rob | robar', description: false, context: false, showPrefix: true },
            { command: 'crime', description: false, context: false, showPrefix: true },
            { command: 'reclamar | regalo | claim', description: false, context: false, showPrefix: true },
            { command: 'cadahora | hourly', description: false, context: false, showPrefix: true },
            { command: 'cadasemana | semanal | weekly', description: false, context: false, showPrefix: true },
            { command: 'cadames | mes | monthly', description: false, context: false, showPrefix: true },
            { command: 'cofre | abrircofre | coffer', description: false, context: false, showPrefix: true },
            { command: 'trabajar | work', description: false, context: false, showPrefix: true },
        ];
    }
    rpgFantasy: {
        title: 'RPG Fnatasy',
            commands;
        [
            { command: 'fantasy | fy', description: false, context: false, showPrefix: true },
            { command: 'fyguia | fyguide', description: false, context: false, showPrefix: true },
            { command: 'fantasyinfo | fyinfo', description: false, context: false, showPrefix: true },
            { command: 'fy agregar | fyadd', description: false, context: false, showPrefix: true },
            { command: 'fycambiar | fychange', description: false, context: false, showPrefix: true },
            { command: 'fylista | fyl', description: false, context: false, showPrefix: true },
            { command: 'fantasymy | fymy', description: false, context: false, showPrefix: true },
            { command: 'fyentregar | fytransfer', description: false, context: false, showPrefix: true },
        ];
    }
    rpgFantasyTop: {
        title: 'TOP en RPG Fnatasy',
            commands;
        [
            { command: 'fytendencia | fyranking', description: false, context: false, showPrefix: true },
        ];
    }
    gataBotTop: {
        title: 'TOP en GATABOT',
            commands;
        [
            { command: 'top | lb | leaderboard', description: false, context: false, showPrefix: true },
        ];
    }
    stickerFilters: {
        title: 'FILTROS EN STICKERS',
            commands;
        [
            { command: 'sticker | s', description: '*imagen o video*', context: false, showPrefix: true },
            { command: 'sticker | s', description: '*url de tipo jpg*', context: false, showPrefix: true },
            { command: 'emojimix', description: '*😺+😆*', context: false, showPrefix: true },
            { command: 'scircle | círculo', description: '*imagen*', context: false, showPrefix: true },
            { command: 'semoji | emoji', description: '*tipo emoji*', context: false, showPrefix: true },
            { command: 'attp', description: '*texto*', context: false, showPrefix: true },
            { command: 'attp2', description: '*texto*', context: false, showPrefix: true },
            { command: 'ttp', description: '*texto*', context: false, showPrefix: true },
            { command: 'ttp2', description: '*texto*', context: false, showPrefix: true },
            { command: 'ttp3', description: '*texto*', context: false, showPrefix: true },
            { command: 'ttp4', description: '*texto*', context: false, showPrefix: true },
            { command: 'ttp5', description: '*texto*', context: false, showPrefix: true },
            { command: 'ttp6', description: '*texto*', context: false, showPrefix: true },
            { command: 'dado', description: false, context: false, showPrefix: true },
            { command: 'stickermarker', description: '*efecto : responder a imagen*', context: false, showPrefix: true },
            { command: 'stickerfilter', description: '*efecto : responder a imagen*', context: false, showPrefix: true },
            { command: 'cs', description: '*:* cs2', context: false, showPrefix: true },
        ];
    }
    modifyStickers: {
        title: 'MODIFICAR STICKERS',
            commands;
        [
            { command: 'wm', description: '*packname|author*', context: false, showPrefix: true },
            { command: 'wm', description: '*texto1|texto2*', context: false, showPrefix: true },
        ];
    }
    dynamicStickers: {
        title: 'STICKERS DINÁMICOS',
            commands;
        [
            { command: 'palmaditas | pat', description: '*@tag*', context: false, showPrefix: true },
            { command: 'bofetada | slap', description: '*@tag*', context: false, showPrefix: true },
            { command: 'golpear', description: '*@tag*', context: false, showPrefix: true },
            { command: 'besar | kiss', description: '*@tag*', context: false, showPrefix: true },
            { command: 'alimentar | food', description: '*@tag*', context: false, showPrefix: true },
        ];
    }
    ownerCommands: {
        title: 'PARA MI CREADOR/A',
            commands;
        [
            { command: 'join', description: '*enlace*', context: false, showPrefix: true },
            { command: 'unete', description: '*enlace*', context: false, showPrefix: true },
            { command: 'dardiamantes', description: '*cantidad*', context: false, showPrefix: true },
            { command: 'darxp', description: '*cantidad*', context: false, showPrefix: true },
            { command: 'dargatacoins', description: '*cantidad*', context: false, showPrefix: true },
            { command: 'addprem | userpremium', description: '*@tag* *cantidad*', context: false, showPrefix: true },
            { command: 'addprem2 | userpremium2', description: '*@tag* *cantidad*', context: false, showPrefix: true },
            { command: 'addprem3 | userpremium3', description: '*@tag* *cantidad*', context: false, showPrefix: true },
            { command: 'addprem4 | userpremium4', description: '*@tag* *cantidad*', context: false, showPrefix: true },
            { command: 'idioma | language', description: '*código*', context: false, showPrefix: true },
            { command: 'cajafuerte', description: false, context: false, showPrefix: true },
            { command: 'comunicar | broadcastall | bc', description: '*texto*', context: false, showPrefix: true },
            { command: 'broadcastchats | bcc', description: '*texto*', context: false, showPrefix: true },
            { command: 'comunicarpv', description: '*texto*', context: false, showPrefix: true },
            { command: 'broadcastgc', description: '*texto*', context: false, showPrefix: true },
            { command: 'comunicargrupos', description: '*texto*', context: false, showPrefix: true },
            { command: 'borrartmp | cleartmp', description: false, context: false, showPrefix: true },
            { command: 'delexp', description: '*@tag*', context: false, showPrefix: true },
            { command: 'delgatacoins', description: '*@tag*', context: false, showPrefix: true },
            { command: 'deldiamantes', description: '*@tag*', context: false, showPrefix: true },
            { command: 'reiniciar | restart', description: false, context: false, showPrefix: true },
            { command: 'actualizar | update', description: false, context: false, showPrefix: true },
            { command: 'addprem | +prem', description: '*@tag*', context: false, showPrefix: true },
            { command: 'delprem | -prem', description: '*@tag*', context: false, showPrefix: true },
            { command: 'listapremium | listprem', description: false, context: false, showPrefix: true },
            { command: 'añadirdiamantes', description: '*@tag cantidad*', context: false, showPrefix: true },
            { command: 'añadirxp', description: '*@tag cantidad*', context: false, showPrefix: true },
            { command: 'añadirgatacoins', description: '*@tag cantidad*', context: false, showPrefix: true },
        ];
    }
}
general: {
    margin: '*··················································*',
        botName;
    'GataBot',
        levelEmojiMap;
    {
        "0";
        "0️⃣", "1";
        "1️⃣", "2";
        "2️⃣", "3";
        "3️⃣", "4";
        "4️⃣", "5";
        "5️⃣", "6";
        "6️⃣", "7";
        "7️⃣", "8";
        "8️⃣", "9";
        "9️⃣", ;
    }
}
;
//# sourceMappingURL=main-menu-content.js.map