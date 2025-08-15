let handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return conn.sendMessage(m.chat, { text: "⚠️ Debes mencionar a un usuario. Usa el formato: .peruano @usuario" }, { quoted: m });
    }
    let userMentioned = m.mentionedJid[0];
    let porcentaje = Math.floor(Math.random() * 100) + 1;
    const mensaje = `💫 *CALCULADORA*\n\n🤮 Los cálculos han arrojado que @${userMentioned.split('@')[0]} es *${porcentaje}%* peruano 🇵🇪\n> ✰ Despegala De Aqui Cacorro!\n\n➤ ¡Sorpresa!`;
    await conn.sendMessage(m.chat, { text: mensaje.replace('@', '') }, { quoted: m });
};
handler.help = ['peruano @usuario'];
handler.tags = ['diversión'];
handler.command = ['peruano'];
export default handler;
//# sourceMappingURL=fun-peruano.js.map