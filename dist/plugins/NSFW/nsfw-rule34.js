import Starlights from "@StarlightsTeam/Scraper";
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!global.db.data.chats[m.chat].nsfw)
        return conn.reply(m.chat, `🚩 El grupo no admite contenido *Nsfw.*\n\n> Para activarlo un *Administrador* debe usar el comando */nsfw on*`, m);
    if (!text)
        return m.reply('🚩 Ingresa el nombre de la imágen que estas buscando.');
    await m.react('🕓');
    try {
        let { dl_url } = await Starlights.rule34(text);
        await conn.sendFile(m.chat, dl_url, 'thumbnail.jpg', `*» Resultado* : ${text}`, m, null);
        await m.react('✅');
    }
    catch {
        await m.react('✖️');
    }
};
handler.help = ['rule34 *<búsqueda>*'];
handler.tags = ['nsfw'];
handler.command = ['rule34', 'r34'];
handler.register = true;
handler.group = true;
export default handler;
//# sourceMappingURL=nsfw-rule34.js.map