const handler = async (m, { conn, usedPrefix, command, isOwner, isAdmin, isBotAdmin, isPremium, isGroup }) => {
    if (typeof global.plugins !== 'object')
        return !0;
    const plugin = global.plugins?.[command];
    if (!plugin)
        return !0;
    if (plugin.rowner && !isOwner)
        return m.reply(global.dfail('rowner', m, conn, usedPrefix));
    if (plugin.owner && !isOwner)
        return m.reply(global.dfail('owner', m, conn, usedPrefix));
    if (plugin.admin && !isAdmin)
        return m.reply(global.dfail('admin', m, conn, usedPrefix));
    if (plugin.group && !isGroup)
        return m.reply(global.dfail('group', m, conn, usedPrefix));
    if (plugin.botAdmin && !isBotAdmin)
        return m.reply(global.dfail('botAdmin', m, conn, usedPrefix));
    if (plugin.premium && !isPremium)
        return m.reply(global.dfail('premium', m, conn, usedPrefix));
    return !0;
};
handler.before = async (m, context) => {
    await handler(m, context);
};
export default handler;
//# sourceMappingURL=restrict-commands.js.map