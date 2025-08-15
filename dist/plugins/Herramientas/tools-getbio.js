let handler = async (m, { conn, usedPrefix, command }) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let bio = await conn.fetchStatus(who).catch(_ => 'undefined');
    let biot = bio.status?.toString() || '*Sin Bio ×*';
    let user = global.db.data.users[who];
    let username = conn.getName(who);
    let str = `${biot}`;
    conn.reply(m.chat, str, m);
};
handler.help = ['getbio', 'getbio *@tag*'];
handler.tags = ['group'];
handler.command = /^(getbio|getdesc)$/i;
handler.register = true;
export default handler;
//# sourceMappingURL=tools-getbio.js.map