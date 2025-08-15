let handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return conn.sendMessage(m.chat, { text: "⚠️ Debes mencionar a un usuario. Usa el formato: .sinpito @usuario" }, { quoted: m });
    }
    let userMentioned = m.mentionedJid[0];
    let porcentaje = Math.floor(Math.random() * 100) + 1;
    const mensaje = `_*@${userMentioned.split('@')[0]}* *ES/IS* *${porcentaje}%* *SINPITO,* *ASI CREE QUE LA TIENE GRANDE? 😂 XD*_`;
    await conn.sendMessage(m.chat, { text: mensaje.replace('@', '') }, { quoted: m });
};
handler.help = ['sinpito @usuario'];
handler.tags = ['diversión'];
handler.command = ['sinpito'];
export default handler;
//# sourceMappingURL=fun-sinpito.js.map