import fetch from 'node-fetch';
let handler = async (m, { conn, usedPrefix, command }) => {
    let img = await (await fetch(`https://i.ibb.co/3N4StyG/file.jpg`)).buffer();
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(4001);
    let txt = `*Hola!, te invito a unirte a los grupos oficiales de del Bot para convivir con la comunidad :D*

*✰* https://chat.whatsapp.com/HG5pAX4xBgv9kvgjTs0sMT


*─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ*

➠ Canal oficial:

Canal :
*✰* ${canal}

> 🚩 ${textbot}`;
    await conn.sendFile(m.chat, img, "Thumbnail.jpg", txt, m, null);
};
handler.help = ['grupos'];
handler.tags = ['main'];
handler.command = /^(grupos)$/i;
export default handler;
//# sourceMappingURL=main-grupos.js.map