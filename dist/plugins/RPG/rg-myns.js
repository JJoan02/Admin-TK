import { createHash } from 'crypto';
let handler = async function (m, { conn, text, usedPrefix }) {
    let sn = createHash('md5').update(m.sender).digest('hex');
    await conn.reply(m.chat, `${sn}`, m);
};
handler.help = ['sn'];
handler.tags = ['rg'];
handler.command = ['nserie', 'sn', 'mysn'];
handler.register = true;
export default handler;
//# sourceMappingURL=rg-myns.js.map