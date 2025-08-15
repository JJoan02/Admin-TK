let handler = async (m, { conn, text }) => {
    if (!text) {
        return conn.sendMessage(m.chat, { text: "Por favor, menciona a un usuario. Ejemplo: .adoptada @usuario" }, { quoted: m });
    }
    let userMentioned = text.split('@')[1];
    let mentionedName = await conn.getName(userMentioned + '@s.whatsapp.net');
    let adoptadaMessage = `*${mentionedName}* *ES/IS* *%* *ADOPTADA* _Sus padres se fueron x pañales 😞😂_`;
    await conn.sendMessage(m.chat, { text: adoptadaMessage }, { quoted: m });
};
handler.help = ['adoptada @usuario'];
handler.tags = ['diversión'];
handler.command = ['adoptada'];
export default handler;
//# sourceMappingURL=fun-adoptada.js.map