import fs from 'fs';
const filePath = './database/personalize.json';
let handler = async (m, { text }) => {
    if (!text)
        throw '❌ Debes proporcionar un enlace de video.';
    const data = JSON.parse(fs.readFileSync(filePath));
    if (!data.global)
        data.global = { botName: null, currency: null, videos: [] };
    data.global.videos.push(text);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    m.reply('✅ Video agregado correctamente.');
};
handler.help = ['setbanner <link>'];
handler.tags = ['config'];
handler.command = /^setbanner$/i;
export default handler;
//# sourceMappingURL=owner-setbaner.js.map