import fetch from 'node-fetch';
export async function before(m, { conn }) {
    let name = `ᥴᥲᥒᥲᥣ 2|sіgᥲᥒ ᥱᥣ ᥴᥲᥒᥲᥣ ⍴᥆r𝖿ᥲ 🔥🌀`;
    let botdata = global.db.data.settings[conn.user.jid] || {};
    global.iconimg1 = botdata.icon1 || 'https://cdn-sunflareteam.vercel.app/images/727906cff9.jpg';
    global.iconimg2 = botdata.icon2 || 'https://cdn-sunflareteam.vercel.app/images/7fb6d39d66.jpg';
    global.icono = pickRandom([global.iconimg1, global.iconimg2]);
    global.rcanal = {
        contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363414007802886@newsletter",
                serverMessageId: 100,
                newsletterName: name,
            },
            externalAdReply: {
                showAdAttribution: true,
                title: botname,
                body: textbot,
                mediaUrl: null,
                description: null,
                previewType: "PHOTO",
                thumbnailUrl: icono,
                sourceUrl: canal,
                mediaType: 1,
                renderLargerThumbnail: false
            },
        },
    };
    global.fkontak = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': wm, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${wm},;;;\nFN:${wm},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`, 'jpegThumbnail': fs.readFileSync('./storage/img/catalogo.png'), thumbnail: fs.readFileSync('./storage/img/catalogo.png'), sendEphemeral: true } } };
    global.rpl = {
        contextInfo: {
            externalAdReply: {
                mediaUrl: group,
                mediaType: 'VIDEO',
                description: 'support group',
                title: packname,
                body: 'grupo de soporte',
                thumbnailUrl: icono,
                sourceUrl: group,
            }
        }
    };
    global.fake = {
        contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363414007802886@newsletter",
                serverMessageId: 100,
                newsletterName: name,
            },
        },
    };
}
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}
//# sourceMappingURL=_fakeReply.js.map