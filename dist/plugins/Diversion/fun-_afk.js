const handler = async (m, { text }) => {
    const user = global.db.data.users[m.sender];
    user.afk = +new Date;
    user.afkReason = text;
    conn.fakeReply(m.chat, `『 ＡＦＫ 』

> ᴇʟ ᴜsᴜᴀʀɪᴏ ${conn.getName(m.sender)} ᴇsᴛᴀ ɪɴᴀᴄᴛɪᴠᴏ. 

\`💤 ＮＯ ＬＯＳ ＥＴＩＱＵＥＴＥ 💤\`
*☣️ ᴍᴏᴛɪᴠᴏs :* ${text ? ': ' + text : 'paja'}`, '0@s.whatsapp.net', `💤 NO MOLESTAR 💤`, 'status@broadcast', null, fake);
};
handler.help = ['afk [alasan]'];
handler.tags = ['econ'];
handler.command = /^afk$/i;
handler.money = 95;
export default handler;
//# sourceMappingURL=fun-_afk.js.map