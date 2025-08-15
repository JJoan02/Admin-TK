const handler = async (m, { conn, usedPrefix, command, text }) => {
    let who;
    if (m.isGroup) {
        who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false;
    }
    else {
        who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat;
    }
    if (!who)
        return m.reply(`*✳️ Menciona a quien deseas agarrarle el huevo jaja*\n\n*📌 Ejemplo :*\n${usedPrefix + command} @tag`);
    let pp = './src/avatar_contact.png';
    try {
        pp = await conn.getProfilePicture(who);
    }
    catch (e) {
    }
    finally {
        let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './storage/avatar_contact.png');
        let username = conn.getName(who);
        let str = `@${m.sender.split('@')[0]} le está agarrando el huevo a @${who.split('@')[0]} 🍆`;
        let mentionedJid = [who, m.sender];
        const abrazo = await conn.reply(m.chat, str, m, { mentions: mentionedJid });
        conn.sendMessage(m.chat, { react: { text: '🍆', key: abrazo.key } });
    }
};
handler.help = ['huevo @user'];
handler.tags = ['fun'];
handler.command = ['huevo'];
handler.group = true;
export default handler;
//# sourceMappingURL=fun-huevo.js.map