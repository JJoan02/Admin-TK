let handler = async (m, { conn, isOwner }) => {
    let vip = global.db.data.users[m.sender].premium;
    let prem = Object.entries(global.db.data.users).filter(user => user[1].premium);
    let caption = `🎟️ 𝙐𝙎𝙐𝘼𝙍𝙄𝙊𝙎 𝙋𝙍𝙀𝙈𝙄𝙐𝙈 : 𝙑𝙄𝙋 𝙐𝙎𝙀𝙍𝙎
*╭•·–––––––––––––––––––·•*
│ *Total : ${prem.length} Usuarios* ${prem ? '\n' + prem.map(([jid], i) => `
│ *${i + 1}.* ${conn.getName(jid) == undefined ? 'Sin Usuarios' : conn.getName(jid)}
│ ${isOwner ? '@' + jid.split `@`[0] : jid}\n│ - - - - - - - - -`.trim()).join('\n') : ''}
*╰•·–––––––––––––––––––·•*\n\n🎟️ 𝗣 𝗥 𝗘 𝗠 𝗜 𝗨 𝗠 ⇢ ${vip ? '✅' : '❌'}\n${wm}`;
    await conn.reply(m.chat, caption, m, { mentions: await conn.parseMention(caption) });
};
handler.command = /^(listapremium|listpremium)$/i;
export default handler;
//# sourceMappingURL=lista-premium.js.map