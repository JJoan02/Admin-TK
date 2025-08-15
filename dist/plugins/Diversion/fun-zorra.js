var handler = async (m, { conn, text }) => {
    if (!text)
        throw '🥵 *ESCRIBE EL NOMBRE DE UN USUARIO PARA CALCULAR SU PORCENTAJE DE ZORRA.*';
    let userMentioned = m.mentionedJid[0];
    if (!userMentioned)
        throw '🥵 *NO SE PUDO ENCONTRAR EL USUARIO MENCIONADO.*';
    let zorraPercentage = Math.floor(Math.random() * 101);
    let zorraMessage = `
━━━━━━━━━━━━━━━
🥵 *${conn.getName(userMentioned)}*, eres más zorra que tu madre en 4 patas y tienes un ${zorraPercentage}% de serlo! 
━━━━━━━━━━━━━━━
`.trim();
    m.reply(zorraMessage, null, { mentions: [userMentioned] });
};
handler.help = ['zorra'];
handler.tags = ['fun'];
handler.command = /^(zorra)$/i;
export default handler;
//# sourceMappingURL=fun-zorra.js.map