let handler = async (m, { conn, isAdmin, isROwner }) => {
    if (!(isAdmin || isROwner))
        return dfail('admin', m, conn);
    global.db.data.chats[m.chat].isBanned = true;
    await conn.reply(m.chat, `🚫 sᥲsᥙkᥱ ᑲ᥆𝗍 FUE DESACTIVADO EN ESTE CHAT`, m, rcanal);
    await m.react('☑️');
};
handler.help = ['banearbot'];
handler.tags = ['group'];
handler.command = ['banearbot', 'banchat'];
handler.group = true;
export default handler;
//# sourceMappingURL=group-banchat.js.map