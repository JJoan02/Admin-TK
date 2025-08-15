let handler = async (m, { conn }) => {
    const imageUrl = 'https://i.ibb.co/fdXKyX73/file.jpg';
    await conn.sendMessage(m.chat, { image: { url: imageUrl } }, { quoted: m });
};
handler.help = ['cuartoschampions'];
handler.tags = ['info'];
handler.command = ['cuartoschampions'];
export default handler;
//# sourceMappingURL=fun-octavos.js.map