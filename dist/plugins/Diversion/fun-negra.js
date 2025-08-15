let handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return conn.sendMessage(m.chat, { text: "⚠️ Debes mencionar a un usuario. Usa el formato: .negra @usuario" }, { quoted: m });
    }
    let userMentioned = m.mentionedJid[0];
    let porcentaje = Math.floor(Math.random() * 100) + 1;
    const mensaje = `_*@${userMentioned.split('@')[0]}* *ES* *${porcentaje}%* *NEGRA 👱🏾‍♀️, MAS NEGRA QUE SU CUCA? 😂*_`;
    await conn.sendMessage(m.chat, { text: mensaje.replace('@', '') }, { quoted: m });
};
handler.help = ['negra @usuario'];
handler.tags = ['diversión'];
handler.command = ['negra'];
export default handler;
//# sourceMappingURL=fun-negra.js.map