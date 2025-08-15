export const adminGroupsMessages = {
    autodetect: {
        groupNameChanged: (user, newName) => `✨ ${user} *ha cambiado el nombre del grupo* ✨\n\n> 📝 *Nuevo nombre:* _${newName}_`,
        groupPhotoChanged: (user) => `📸 *¡Nueva foto de grupo!* 📸\n\n> 💫 Acción realizada por: ${user}`,
        groupLinkReset: (user) => `🔗 *¡El enlace del grupo ha sido restablecido!* 🔗\n\n> 💫 Acción realizada por: ${user}`,
        groupSettingsAdjusted: (user, state) => `⚙️ ${user} ha ajustado la configuración del grupo.\n\n> 🔒 Ahora *${state === 'on' ? 'solo los administradores' : 'todos'}* pueden configurar el grupo.`,
        groupStatusChanged: (user, state) => `🗣️ El grupo ha sido *${state === 'on' ? 'cerrado' : 'abierto'}* por ${user}!\n\n> 💬 Ahora *${state === 'on' ? 'solo los administradores' : 'todos'}* pueden enviar mensajes.`,
        adminPromoted: (adminUser, promotedUser) => `👑 @${promotedUser} *¡Ahora es administrador del grupo!* 👑\n\n> 💫 Acción realizada por: ${adminUser}`,
        adminDemoted: (adminUser, demotedUser) => `🗑️ @${demotedUser} *ha dejado de ser administrador del grupo.* 🗑️\n\n> 💫 Acción realizada por: ${adminUser}`,
    },
    addParticipant: {
        description: 'Agrega un usuario al grupo o envía un enlace de invitación. Uso: !add <numero> o @mencion',
        noTarget: '🚩 Menciona a una persona o ingresa su número para agregar.',
        noPlus: '🚩 Ingrese el número todo junto sin el *+*',
        invalidNumber: '*Ingrese solo números y un código de país válido sin espacios*',
        restrict: (smsAvisoAG, smsSoloOwner) => `${smsAvisoAG}${smsSoloOwner}`,
        inviteSent: (targetNumber) => `Se envió un enlace de invitación al usuario ${targetNumber}.`,
        added: (targetNumber, smsAdd2) => `*@${targetNumber}*\n${smsAdd2}`,
        addError: (targetNumber, status) => `No se pudo agregar a ${targetNumber}. Estado: ${status}`,
        error: 'Ocurrió un error al intentar agregar al usuario. Asegúrate de que el bot sea administrador y el número sea válido.',
        inviteMessage: (groupLink, smsAdd) => `${smsAdd}\n\n${groupLink}`,
    },
    admins: {
        description: 'Menciona a los administradores del grupo con un mensaje. Uso: !admins <mensaje>',
        noText: (smsAvisoMG) => `${smsAvisoMG}INGRESE UN TEXTO POR CUAL QUIERE QUE SOLICITE LA PRESENCIA DEL LOS ADMINS`,
        header: (pesan, smsAddB5) => `${smsAddB5} _${pesan}_`,
        body: (listAdmin, smsAddB4) => `${listAdmin}\n\n⛔ ${smsAddB4} ⛔`,
        title: (smsAddB3) => `ෆ ${smsAddB3}`,
        template: (title, header, body, vs) => `*⊱ ──── 《.⋅ 🐈 ⋅.》 ──── ⊰*\n${title}\n${header}\n*⊱ ──── 《.⋅ ${vs} ⋅.》 ──── ⊰*\n${body}`,
        error: 'Ocurrió un error al intentar mencionar a los administradores.',
    },
    banBot: {
        description: 'Desactiva el bot en el grupo o banea el chat. Solo para administradores o propietario.',
        alreadyBanned: 'Este chat ya está baneado.',
        banned: '🤍 *Este chat fue baneado con éxito*',
        alreadyOff: 'El bot ya está desactivado en este grupo.',
        off: `╭━━━✦❘༻༺❘✦━━━╮\n   🚩 *𝐁𝐨𝐭 𝐀𝐩𝐚𝐠𝐚𝐝𝐨* 🚩\n╰━━━✦❘༻༺❘✦━━━╯\n\nEl bot ha sido *desactivado* en este grupo con éxito.`,
        error: 'Ocurrió un error al intentar realizar la acción.',
        notAdmin: 'Este comando solo puede ser usado por administradores o el propietario.',
    },
    checkExpired: {
        description: 'Verifica el tiempo restante de caducidad del grupo.',
        notSet: '🚩 Este grupo no está configurado para caducar.',
        notSetTarget: (targetChatId) => `🚩 El chat ${targetChatId} no está configurado para caducar.`,
        expired: '🚩 El alquiler de este grupo ha caducado.',
        expiresIn: (formattedTime) => `🚩 Su alquiler expira en *${formattedTime}*\n\n_Después el bot saldrá automáticamente del grupo._`,
        error: 'Ocurrió un error al verificar la caducidad del grupo.',
        msToDate: (ms) => {
            let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
            let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
            let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
            let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
            return [d, ' *Días*\n ', h, ' *Horas*\n ', m, ' *Minutos*\n ', s, ' *Segundos* '].map(v => v.toString().padStart(2, '0')).join('');
        }
    },
    deleteMessage: {
        description: 'Elimina un mensaje respondiendo a él. Uso: !del (respondiendo al mensaje)',
        noQuoted: '🚩 Responde al mensaje que deseas eliminar.',
        noInfo: 'No se pudo obtener la información necesaria para eliminar el mensaje.',
        error: 'Ocurrió un error al intentar eliminar el mensaje. Asegúrate de que el bot sea administrador.',
    },
    deleteSession: {
        description: 'Elimina archivos de sesión de un chat o usuario. Uso: !ds',
        notOnMainBot: 'Utiliza este comando directamente en el número principal del Bot',
        noFiles: 'No se encontró ningún archivo de sesión que incluya la ID del chat/usuario.',
        deleted: (filesDeleted) => `*Se eliminaron ${filesDeleted} archivos de sesión*`,
        error: 'Ocurrió un error al eliminar los archivos de sesión.',
        hello: '*Hola, ¿ya me pueden ver?*',
    },
    demote: {
        description: 'Degrada a un miembro del grupo. Uso: !demote @mencion o !demote <numero>',
        noTarget: '🚩 Menciona a una persona o ingresa su número para degradar.',
        success: (user) => `🚩 Usuario ${user} degradado con éxito.`,
        error: 'Ocurrió un error al intentar degradar al usuario. Asegúrate de que el bot sea administrador y el usuario no sea el creador del grupo.',
    },
    destraba: {
        description: 'Envía un mensaje para 
    }
};
//# sourceMappingURL=messages.js.map