export const antiSpamSeguridadContent = {
    antiArabe: {
        message: (smsAviso, sender) => `${smsAviso} @${sender} ha sido baneado, por orden de mi propietaria no pueden usar el bot.\n\nSOLO PUEDEN USAR LOS SEGUIRTE COMANDO:\n- /jadibot\n- /jadibot code\n- /estado\n\n⚠️ 	Serás Baneado(a) 	 ⚠️`,
    },
    antiArab: {
        message: '🚩 En este grupo solo se permite personas de habla hispana.',
        warn: (user) => `No se pudo remover a ${user} del grupo.`,
    },
    antiBotCommand: {
        description: 'Activa o desactiva la función anti-bot en el grupo. Uso: !antibot <on/off>',
        noArgs: '*Configurar AntiBot*. Escriba "on" para activar y "off" para desactivar.',
        alreadyOn: 'AntiBot ya está activado.',
        on: '🚩 AntiBot activado para este grupo.',
        alreadyOff: 'AntiBot ya está desactivado.',
        off: '🚩 AntiBot desactivado para este grupo.',
    },
    antiBotPlugin: {
        warn: (sender) => `No se pudo remover al bot ${sender} del grupo.`,
    },
    antiFakes: {
        warn: (sender, prefix) => `No se pudo remover al usuario ${sender} del grupo (prefijo ${prefix}).`,
    },
    antiInternational: {
        message: (smsAdvertencia, smsFake) => `${smsAdvertencia}${smsFake}`,
        warn: (user) => `No se pudo remover a ${user} del grupo.`,
    },
    antiLink: {
        warningMessage: (user) => `*「 ANTILINK DETECTADO 」*\n\n${user} Rompiste las reglas del Grupo serás eliminado...`,
        warn: (sender) => `No se pudo remover a ${sender} del grupo (status 404).`,
        noAdminMessage: (listAdmin) => `🚩 El antilink está activo pero no puedo eliminarte porque no soy adm.\n\nAdministradores:\n${listAdmin}`,
    },
    antiPrivado: {
        redirectMessage: (userMention) => `☁️ *Hola* ${userMention}, *no puede usar este bot en chat privado*\n\nUnite al Grupo oficial para poder usar el bot\nhttps://chat.whatsapp.com/GqKwwoV2JJaJDP2SL7SddX`,
    },
    antiPutos: {
        blockedMessage: '🚫 Tu número de teléfono no está permitido en este bot. Serás bloqueado.',
        error: (sender, e) => `Error al intentar bloquear al usuario ${sender}: ${e.message}`,
    },
    antiSpam: {
        level1: `᥀·࣭࣪̇˖⚔️◗ 𝙉𝙤 𝙝𝙖𝙜𝙖𝙨 𝙨𝙥𝙖𝙢.`,
        level2: `᥀·࣭࣪̇˖⚔️◗ 𝙉𝙤 𝙝𝙖𝙜𝙖𝙨 𝙨𝙥𝙖𝙢...`,
        level3: `᥀·࣭࣪̇˖👺◗ 𝙎𝙚𝙧𝙖𝙨 𝙚𝙡𝙞𝙢𝙞𝙣𝙖𝙙𝙤(𝙖) 𝙥𝙤𝙧 𝙝𝙖𝙘𝙚𝙧 𝙨𝙥𝙖𝙢.`,
        warning: (mention) => `🚩 _*Mucho Spam*_

𝙐𝙨𝙪𝙖𝙧𝙞𝙤: ${mention}`,
        reset: (sender) => `AntiSpam: ${sender} reseteado.`,
    },
    antiSubbots: {
        message: '✦ En este grupo está el bot principal, el cual me saldré para no hacer spam.',
    },
    antiToxic: {
        warn: (sender) => `Bot no es admin, no se pudo remover a ${sender} por toxicidad.`,
    },
    antiTrabas: {
        warn: (sender) => `No se pudo remover a ${sender} del grupo (status 404).`,
    },
    antiVer: {
        description: (type, senderMention, caption) => `
✅️ *ANTI VER UNA VEZ* ✅️\n\n💭 *No ocultes* ${type === 'imageMessage' ? '`Imagen` 📷' : type === 'videoMessage' ? '`Vídeo` 🎥' : type === 'audioMessage' ? '`Mensaje de voz` 🎤' : 'este mensaje'}\n- ✨️ *Usuario:* ${senderMention}
${caption ? `- *Texto:* ${caption}` : ''}`,
    },
    antiVirus: {
        chatCleaned: (chat) => `Chat ${chat} limpiado debido a mensaje stub tipo 68.`,
        error: (chat, e) => `Error al limpiar el chat ${chat}: ${e.message}`,
    },
};
//# sourceMappingURL=anti-spam-seguridad-content.js.map