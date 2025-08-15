let handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return conn.sendMessage(m.chat, { text: "⚠️ Debes mencionar a un usuario. Usa el formato: .sinculo @usuario" }, { quoted: m });
    }
    let userMentioned = m.mentionedJid[0];
    const porcentaje = 85;
    const mensaje = `_*@${userMentioned.split('@')[0]}* *ES/IS* *${porcentaje}%* *SINCULO,* *ASI CREE QUE TIENE UN CULAZO? 😂 *_`;
    await conn.sendMessage(m.chat, { text: mensaje.replace('@', '') }, { quoted: m });
};
handler.help = ['sinculo @usuario'];
handler.tags = ['diversión'];
handler.command = ['sinculo'];
export default handler;
//# sourceMappingURL=fun-sinculo.js.map