import { sticker } from '../lib/sticker.js';
let handler = async (m, { conn, args, usedPrefix, command }) => {
    let stiker = false;
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || '';
        if (/webp|image|video/g.test(mime)) {
            if (/video/g.test(mime))
                if ((q.msg || q).seconds > 10)
                    return m.reply(`《✧》¡El video no puede durar mas de 10 segundos!`);
            let img = await q.download?.();
            if (!img)
                return conn.reply(m.chat, `《✧》Por favor, envia una imagen o video para hacer un sticker`, m, rcanal);
            let out;
            try {
                stiker = await sticker(img, false, global.sticker2, global.sticker1);
            }
            catch (e) {
                console.error(e);
            }
            finally {
                if (!stiker) {
                    if (/webp/g.test(mime))
                        out = await webp2png(img);
                    else if (/image/g.test(mime))
                        out = await uploadImage(img);
                    else if (/video/g.test(mime))
                        out = await uploadFile(img);
                    if (typeof out !== 'string')
                        out = await uploadImage(img);
                    stiker = await sticker(false, out, global.sticker2, global.sticker1);
                }
            }
        }
        else if (args[0]) {
            if (isUrl(args[0]))
                stiker = await sticker(false, args[0], global.sticker2, global.sticker1);
            else
                return m.reply(`《✧》El Link Es Incorrecto`);
        }
    }
    catch (e) {
        console.error(e);
        if (!stiker)
            stiker = e;
    }
    finally {
        if (stiker)
            conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply: { showAdAttribution: false, title: packname, body: botname, mediaType: 2, sourceUrl: redes, thumbnail: icons } } }, { quoted: m });
        else
            return conn.reply(m.chat, '《✧》Por favor, envia una imagen o video para hacer un sticker', m, rcanal);
    }
};
handler.help = ['stiker *<img>*', 'sticker *<url>*'];
handler.tags = ['sticker'];
handler.group = false;
handler.register = true;
handler.command = ['s', 'sticker', 'stiker'];
export default handler;
const isUrl = (text) => {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'));
};
//# sourceMappingURL=sticker-sticker.js.map