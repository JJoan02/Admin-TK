let handler = async (m, { conn, isOwner }) => {
    let users = Object.entries(global.db.data.users).filter(user => user[1].banned);
    let caption = `
*╭•·–| 👥 𝙐𝙎𝙐𝘼𝙍𝙄𝙊𝙎 𝘽𝘼𝙉𝙀𝘼𝘿𝙊𝙎 : 𝘽𝘼𝙉𝙉𝙀𝘿 |–·•*
│ *Total : ${users.length} Usuarios* ${users ? '\n' + users.map(([jid], i) => `
│
│ *${i + 1}.* ${conn.getName(jid) == undefined ? 'Sin Usuarios Baneados' : conn.getName(jid)}
│ ${isOwner ? '@' + jid.split `@`[0] : jid}\n│ - - - - - - - - -`.trim()).join('\n') : ''}
│ *Estos usuarios no puedes Usar a GataBot*
*╰•·–––––––––––––––––––·•*`.trim();
    await conn.reply(m.chat, caption, m, { mentions: await conn.parseMention(caption) });
};
handler.command = /^listabanuser|listausuarios|listbanuser|listabaneados|listban$/i;
export default handler;
//# sourceMappingURL=lista-usuarios_baneados.js.map