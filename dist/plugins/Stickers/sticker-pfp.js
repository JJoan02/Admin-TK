let handler = async (m, { conn }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let name = conn.getName(who);
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './logo.jpg');
    conn.sendFile(m.chat, pp, 'profile.jpg', `Aquí está la foto de perfil de ${name}`, m);
    m.react('✅');
};
handler.help = ['pfp @user'];
handler.tags = ['sticker'];
handler.command = ['pfp'];
export default handler;
//# sourceMappingURL=sticker-pfp.js.map