let toM = a => '@' + a.split('@')[0];
function handler(m, { groupMetadata }) {
    let ps = groupMetadata.participants.map(v => v.id);
    let a = ps.getRandom();
    let b;
    do {
        b = ps.getRandom();
    } while (b === a);
    m.reply(`*${toM(a)}, 𝙳𝙴𝙱𝙴𝚁𝙸𝙰𝚂 Hacerte  NV 𝙲𝙾𝙽 ${toM(b)}, 𝙷𝙰𝙲𝙴𝙽 𝚄𝙽𝙰 𝙱𝚄𝙴𝙽𝙰 𝙿𝙰𝚁𝙴𝙹𝙰 💓*`, null, {
        mentions: [a, b]
    });
}
handler.help = ['formarnv'];
handler.tags = ['fun'];
handler.command = ['formarnv'];
handler.group = true;
export default handler;
//# sourceMappingURL=formar-nv.js.map