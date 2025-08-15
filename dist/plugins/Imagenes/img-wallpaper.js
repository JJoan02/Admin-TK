import { googleImage, pinterest } from '@bochilteam/scraper';
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text)
        return conn.reply(m.chat, `🚩 Ingresa un texto junto al comando.\n\n*Ejemplo:*\n*${usedPrefix + command}* Ai Hoshino`, m);
    await m.react('🕓');
    try {
        let res = await (await googleImage('wallpaper' + text)).getRandom();
        await conn.sendFile(m.chat, res, 'thumbnail.jpg', `*» Wallpaper* : ${text ? text.capitalize() : false}`, m, null);
        await m.react('✅');
    }
    catch {
        await m.react('✖️');
    }
};
handler.help = ['wallpaper *<búsqueda>*'];
handler.tags = ['img'];
handler.command = ['wallpaper', 'wallpapers', 'wp'];
handler.register = true;
export default handler;
//# sourceMappingURL=img-wallpaper.js.map