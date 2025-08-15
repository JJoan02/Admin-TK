export const antiMessages = {
    onlyLatinos: '🚩 En este grupo solo se permite personas de habla hispana.',
    antiLink: (userName, isBotAdmin) => `🚩 No permitimos enlaces de otros grupos, lo siento *@${userName}* serás expulsado del grupo ${isBotAdmin ? '' : '\n\nNo soy admin así que no te puedo expulsar :"v'}`,
    antiPrivate: (userName) => `╭─── *🌸 Sistema Anti Privado 🌸* ───╮\n│ ✦ Hola @${userName},\n│ ✦ Lo siento, no está permitido enviarme\n│    mensajes en privado. Serás bloqueado/a.\n╰──────────────────────────────╯`,
    antiSpam1: '᥀·࣭࣪̇˖😠◗ 𝙉𝙤 𝙝𝙖𝙜𝙖𝙨 𝙨𝙥𝙖𝙢.',
    antiSpam2: '᥀·࣭࣪̇˖😡◗ 𝙉𝙤 𝙝𝙖𝙜𝙖𝙨 𝙨𝙥𝙖𝙢...',
    antiSpam3: '᥀·࣭࣪̇˖🤬◗ 𝙎𝙚𝙧𝙖𝙨 𝙚𝙡𝙞𝙢𝙞𝙣𝙖𝙙𝙤(𝙖) 𝙥𝙤𝙧 𝙝𝙖𝙘𝙚𝙧 𝙨𝙥𝙖𝙢.',
    antiSpamWarning: (mention) => `🌷 _*Mucho Spam*_\n\n𝙐𝙨𝙪𝙖𝙧𝙞𝙤: ${mention}`,
    antiSpamExpulsion: (mention) => `🌷 _*Mucho Spam*_\n\n𝙐𝙨𝙪𝙖𝙧𝙞𝙤: ${mention}\nSerás expulsado del grupo por spam.`,
};
//# sourceMappingURL=anti-content.js.map