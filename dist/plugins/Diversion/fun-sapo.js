var handler = async (m, { conn, text }) => {
    if (!text)
        throw '🍭 *ESCRIBE EL NOMBRE DE UN USUARIO PARA CALCULAR SU PORCENTAJE DE SAPO.*';
    let userMentioned = m.mentionedJid[0];
    if (!userMentioned)
        throw '🍭 *NO SE PUDO ENCONTRAR EL USUARIO MENCIONADO.*';
    let sapoPercentage = Math.floor(Math.random() * 101);
    let sapoMessage = `
━━━━━━━━━━━━━━━
🐸 *${conn.getName(userMentioned)}*, eres un ${sapoPercentage}% sapo! 
━━━━━━━━━━━━━━━
`.trim();
    m.reply(sapoMessage, null, { mentions: [userMentioned] });
};
handler.help = ['sapo'];
handler.tags = ['fun'];
handler.command = /^(sapo)$/i;
export default handler;
//# sourceMappingURL=fun-sapo.js.map