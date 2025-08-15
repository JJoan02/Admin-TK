export async function before(m) {
    const chat = global.db.data.chats[m.chat] || {};
    if (m.plugin && m.plugin.startsWith('nsfw-')) {
        if (!chat.nsfw) {
            m.reply('⚠️ El contenido NSFW está desactivado en este chat.');
            return !0;
        }
    }
}
//# sourceMappingURL=nsfw-blocker.js.map