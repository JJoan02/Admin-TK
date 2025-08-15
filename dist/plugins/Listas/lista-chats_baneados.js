let handler = async (m, { conn }) => {
    let ban = global.db.data.chats;
    let chats = Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned);
    let caption = `*╭•·––| 💬 𝘾𝙃𝘼𝙏𝙎 𝘽𝘼𝙉𝙀𝘼𝘿𝙊𝙎 : 𝘽𝘼𝙉𝙉𝙀𝘿 |––·•*
│ *Total: ${chats.length} Chats* ${chats ? '\n│\n' + chats.map(([jid], i) => `
│ ${i + 1}. ${conn.getName(jid) == undefined ? 'Sin Chats Baneados' : `*CHAT BANEADO*`}
│ ${jid}\n│ - - - - - - - - -`.trim()).join('\n') : ''}
*╰•·–––––––––––––––––––·•*`;
    await conn.reply(m.chat, caption, m, { mentions: await conn.parseMention(caption) });
};
handler.command = /^chat(s)?baneado(s)?|list(a)?chat(s)?|list(a)?ban(chat(s)?)?$/i;
export default handler;
//# sourceMappingURL=lista-chats_baneados.js.map