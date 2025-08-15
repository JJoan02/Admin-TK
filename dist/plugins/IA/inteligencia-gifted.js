import fetch from 'node-fetch';
let handler = async (m, { conn, text }) => {
    if (!text) {
        return conn.reply(m.chat, `❀ Ingresa un texto para hablar con gifted`, m);
    }
    try {
        let api = await fetch(`https://api.giftedtech.my.id/api/ai/gpt?apikey=gifted&q=${text}`);
        let json = await api.json();
        await conn.sendMessage(m.chat, {
            text: '*Gifted:* ' + json.result,
            contextInfo: {
                forwardingScore: 9999999,
                isForwarded: false,
                externalAdReply: {
                    showAdAttribution: true,
                    containsAutoReply: true,
                    title: `❀ gі𝖿𝗍ᥱძ - іᥒ𝗍ᥱᥣіgᥱᥒᥴіᥲ`,
                    body: dev,
                    previewType: "PHOTO",
                    thumbnailUrl: 'https://files.catbox.moe/bjmjxd.jpeg',
                    sourceUrl: channels,
                }
            }
        }, { quoted: m });
    }
    catch (error) {
        console.error(error);
    }
};
handler.help = ['gifted *<text>*'];
handler.tags = ['ai'];
handler.register = true;
handler.command = ['gifted'];
export default handler;
//# sourceMappingURL=inteligencia-gifted.js.map