export const urlShortenerMessages = {
    noLink: '🚩 Ingresa el enlace que deseas acortar.',
    success: (originalUrl, shortUrl) => `*» Url Acortado* : ${shortUrl}`,
    error: (usedPrefix, command) => `${global.lenguajeTK.smsMalError3()}#report ${global.lenguajeTK.smsMensError2()} ${usedPrefix + command}\n\n${global.wm}`
};
export const calculatorMessages = {
    cheatDetected: '😨 𝙉𝙊 𝙃𝘼𝙂𝘼𝙎 𝙏𝙍𝘼𝙈𝙋𝘼!!\n𝘿𝙊 𝙉𝙊𝙏 𝘾𝙃𝙀𝘼𝙏!!',
    noExpression: '𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙐𝙉𝘼 𝙊𝙋𝙀𝙍𝘼𝘾𝙄𝙊𝙉 𝙈𝘼𝙏𝙀𝙈𝘼𝙏𝙄𝘾𝘼 𝙋𝘼𝙍𝘼 𝘾𝘼𝙇𝘾𝙐𝙇𝘼𝙍 𝙀𝙇 𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊\n\n𝙀𝙉𝙏𝙀𝙍 𝘼 𝙈𝘼𝙏𝙃𝙀𝙈𝘼𝙏𝙄𝘾𝘼𝙇 𝙊𝙋𝙀𝙍𝘼𝙏𝙄𝙊𝙉 𝙏𝙊 𝘾𝘼𝙇𝘾𝙐𝙇𝘼𝙏𝙀 𝙏𝙃𝙀 𝙍𝙀𝙎𝙐𝙇𝙏',
    invalidFormat: '𝙎𝙊𝙇𝙊 𝙎𝙀 𝘼𝘿𝙈𝙄𝙏𝙀𝙉 𝙉𝙐𝙈𝙀𝙍𝙊𝙎 𝙔 𝙎𝙄𝙈𝘽𝙊𝙇𝙊𝙎, 𝙊𝙉𝙇𝙔 𝙉𝙐𝙈𝘽𝙀𝙍𝙎 𝘼𝙉𝘿 𝙎𝙔𝙈𝘽𝙊𝙇𝙎 𝘼𝙍𝙀 𝘼𝙇𝙇𝙊𝙒𝙀𝘿 -, +, * , /, ×, ÷, π, e, (, )*',
    result: (format, result) => `*${format}* = _${result}_`
};
export const chatGptMessages = {
    noText: (usedPrefix, command) => `*${global.lenguajeTK.smsAvisoMG()}𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙐𝙉𝘼 𝙋𝙀𝙏𝙄𝘾𝙞𝙤𝙣 𝙊 𝙐𝙉a 𝙊𝙍𝘿𝙀𝙉 𝙋𝘼𝙍𝘼 𝙐𝙎𝘼𝙍 𝙇𝘼 𝙁𝙐𝙉𝘾𝙞𝙤𝙣 𝘿𝙀𝙡 𝘾𝙃𝘼𝙏𝙂𝙥𝙏\n\n❏ 𝙀𝙅𝙀𝙈 pulp 𝘿𝙀 𝙋𝙀𝙏𝙄𝘾𝙞𝙤𝙣𝙀𝙎 𝙔 𝙊𝙍𝘿𝙀𝙉𝙀𝙎\n❏ ${usedPrefix + command} Recomienda un top 10 de películas de acción\n❏ ${usedPrefix + command} Codigo en JS para un juego de cartas`,
    error: (usedPrefix, command) => `${global.lenguajeTK.smsMalError3()}#report ${global.lenguajeTK.smsMensError2()} ${usedPrefix + command}\n\n${global.wm}`,
    noResponse: 'No se pudo obtener una respuesta de la IA. Inténtalo de nuevo más tarde.'
};
export const deleteMessages = {
    noTarget: '𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝙀 𝘼𝙇 𝙈𝙀𝙉𝙎𝘼𝙅𝙀 𝘿𝙀 𝘼𝙇𝙂𝙐𝙄𝙀𝙉 𝙋𝘼𝙍𝘼 𝙋𝙊𝘿𝙀𝙍 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝙍 𝙀𝙇 𝙈𝙀𝙉𝙎𝘼𝙂𝙀.\n\n𝙍𝙀𝙋𝙇𝙔 𝙏𝙊 𝙎𝙊𝙈𝙀𝙊𝙣𝙀\'S 𝙈𝙀𝙎𝙎𝘼𝙂𝙀 𝙎𝙊 𝙔𝙊𝙐 𝘾𝘼𝙉 𝘿𝙀𝙇𝙀𝙏𝙀 𝙏𝙃𝙀 𝙈𝙀𝙎𝙎𝘼𝙂𝙀.',
    mentionOrReplyRequired: '⚠️ 𝘿𝙀𝘽𝙀𝙎 𝙈𝙀𝙉𝘾𝙞𝙤𝙣𝙖𝙧 𝘼 𝘼𝙇𝙂𝙐𝙄𝙀𝙉, 𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝙀𝙍 𝘼 𝙐𝙉 𝙈𝙀𝙉𝙎𝘼𝙅𝙀 𝙊 𝙋𝙍𝙊𝙈𝙊𝙍𝘾𝙞𝙤𝙣𝙖𝙩 𝙐𝙉 𝙉𝙐𝙈𝙀𝙍𝙊 𝙑𝘼𝙇𝙄𝘿𝙊',
    noRecentMessages: '⚠️ 𝙉𝙊 𝙎𝙀 𝙀𝙈𝘾𝙊𝙉𝙏𝙍𝘼𝙍𝙊𝙉 𝙈𝙀𝙉𝙎𝘼𝙂𝙀𝙎 𝙍𝙀𝘾𝙄𝙀𝙉𝙏𝙀𝙎 𝘿𝙀𝙇 𝙐𝙎𝙐𝘼𝙍𝙞𝙤𝙎',
    success: (deletedCount, targetType, targetValue) => `✅ 𝙎𝙀 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝙍𝙊𝙉 ${deletedCount} 𝙈𝙀𝙉𝙎𝘼𝙂𝙀𝙎 𝘿𝙀 ${targetType === 'number' ?
        `𝙀𝙇 𝙉𝙐𝙈𝙀𝙍𝙊 ${targetValue}` : '𝙀𝙇 𝙐𝙎𝙐𝘼𝙍𝙞𝙤 𝙈𝙀𝙉𝘾𝙞𝙤𝙣𝙖𝙙𝙤'}.`,
    error: 'Ocurrió un error al intentar eliminar el mensaje.'
};
export const fakeReplyMessages = {
    usage: (usedPrefix, command, senderMention) => `🚩 *Ejemplo de uso*\n\n!${command} Hola @${senderMention} Buenas`,
    mentionRequired: (usedPrefix, command, senderMention) => `🚩 *Ejemplo de uso*\n\n!${command}* Hola @${senderMention} Buenas`,
    error: 'Ocurrió un error al intentar crear la respuesta falsa.'
};
export const geminiMessages = {
    noText: (usedPrefix, command) => `*${global.lenguajeTK.smsAvisoMG()}𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙐𝙉𝘼 𝙋𝙀𝙏𝙄𝘾𝙞𝙤𝙣 𝙊 𝙐𝙉a 𝙊𝙍𝘿𝙀𝙉 𝙋𝘼𝙍𝘼 𝙐𝙎𝘼𝙧 𝙇𝘼 𝙁𝙐𝙉𝙘𝙞𝙤𝙣 𝘿𝙀𝙡 𝘽𝘼𝙍𝘿\n\n❏ 𝙀𝙅𝙀𝙈 pulp 𝘿𝙀 𝙋𝙀𝙏𝙄𝙘𝙞𝙤𝙣𝙀𝙎 𝙔 𝙊𝙍𝘿𝙀𝙉𝙀𝙎\n❏ ${usedPrefix + command} Recomienda un top 10 de películas de acción\n❏ ${usedPrefix + command} Codigo en JS para un juego de cartas`, error: (usedPrefix, command) => `${global.lenguajeTK.smsMalError3()}#report ${global.lenguajeTK.smsMensError2()} ${usedPrefix + command}\n\n${global.wm}`
};
export const getBioMessages = {
    error: (errorMessage) => `Ocurrió un error: ${errorMessage}`,
    bioInfo: (user, status, setAt) => `*Usuario:* ${user}\n*Estado:* ${status}\n*Fecha de actualización:* ${setAt}`
};
export const imageEnhanceMessages = {
    noImage: (usedPrefix, command) => `╰⊱❗️⊱ *𝙇𝙊 𝙐𝙎𝙊́ 𝙈𝘼𝙇 | 𝙐𝙎𝙀𝘿 𝙄𝙏 𝙒𝙍𝙊𝙉𝙂* ⊱❗️⊱╮\n\n𝙀𝙉𝙑𝙄𝙀 𝙐𝙉𝘼 𝙄𝙈𝘼𝙂𝙀𝙉 𝙊 𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝘼 𝘼 𝙐𝙉𝘼 𝙄𝙈𝘼𝙂𝙀𝙉 𝘾𝙊𝙉 𝙀𝙇 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 ${usedPrefix + command}`,
    invalidFormat: (mime) => `╰⊱⚠️⊱ *𝘼𝘿𝙐𝙀𝙍𝙏𝙀𝙉𝘾𝙞𝙖 | 𝙒𝘼𝙍𝙉𝙄𝙉𝙂* ⊱⚠️⊱╮\n\nEL FORMATO DEL ARCHIVO (${mime}) NO ES COMPATIBLE, ENVÍA O RESPONDE A UNA FOTO`,
    processing: `*🐈 𝙈𝙀𝙅𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝘼 𝘾𝘼𝙇𝙄𝘿𝘼𝘿...*`,
    success: `*Aqui tiene ฅ^•ﻌ•^ฅ*`,
    error: `╰⊱⚠️⊱ *𝘼𝘿𝙐𝙀𝙍𝙏𝙀𝙉𝘾𝙞𝙖 | 𝙒𝘼𝙍𝙉𝙄𝙉𝙂* ⊱⚠️⊱╮\n\n𝙁𝘼𝙇𝙇𝙊, 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍`
};
export const whatsappInspectorMessages = {
    noLink: '*⚠️ Ingrese un enlace de un grupo/comunidad/canal de WhatsApp para obtener información.*',
    groupNotFound: 'Grupo no encontrado',
    channelNotFound: '*No se encontró información del canal.* Verifique que el enlace sea correcto.',
    botNotAdminChannel: '\n\n> *Verifique que el Bot sea admin en el canal, de lo contrario no funcionará el comando*',
    title: '🔰 Inspector de Grupos',
    channelTitle: '📢 Inspector de Canales',
    groupInfo: (res, pp, inviteCode, formatDate, formatParticipants) => `🆔 *Identificador del grupo:*
${res.id || ""}`
};
//# sourceMappingURL=herramientas-content.js.map