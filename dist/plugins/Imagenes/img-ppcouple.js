import Starlights from "@StarlightsTeam/Scraper";
let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        await m.react('🕓');
        let { women, man } = await Starlights.ppcouple("xd");
        await conn.sendFile(m.chat, women, 'thumbnail.jpg', `*» Chica*`, m, null);
        await conn.sendFile(m.chat, man, 'thumbnail.jpg', `*» Chico*`, m, null);
        await m.react('✅');
    }
    catch {
        await m.react('✖️');
    }
};
handler.help = ['ppcouple'];
handler.tags = ['img'];
handler.command = ['ppcouple', 'par'];
handler.register = true;
export default handler;
//# sourceMappingURL=img-ppcouple.js.map