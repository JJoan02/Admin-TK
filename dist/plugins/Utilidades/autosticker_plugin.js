import { sticker } from '../../lib/sticker';
import { AUTOSTICKER_VIDEO_TOO_LONG, AUTOSTICKER_PACKNAME, AUTOSTICKER_AUTHOR } from '../../content/utilidades/autosticker-responses';
import { GATA_IMG_URL, GT_URL, ACCOUNTSGB_URL } from '../../../config/redes_sociales/socialMediaConfig';
class AutostickerPlugin {
    async before(m, { conn }) {
        let chat = global.db.data.chats[m.chat];
        let user = global.db.data.users[m.sender];
        if (chat && chat.autosticker && m.isGroup) {
            let q = m;
            let stiker = false;
            let mime = (q.msg || q).mimetype || q.mediaType || '';
            if (/webp/g.test(mime))
                return;
            if (/image/g.test(mime)) {
                let img = await q.download?.();
                if (!img)
                    return;
                stiker = await sticker(img, false, AUTOSTICKER_PACKNAME, AUTOSTICKER_AUTHOR);
            }
            else if (/video/g.test(mime)) {
                if ((q.msg || q).seconds > 8) {
                    await m.reply(AUTOSTICKER_VIDEO_TOO_LONG);
                    return;
                }
                let img = await q.download();
                if (!img)
                    return;
                stiker = await sticker(img, false, AUTOSTICKER_PACKNAME, AUTOSTICKER_AUTHOR);
            }
            else if (m.text && AutostickerPlugin.isUrl(m.text.split(/\n| /i)[0])) {
                stiker = await sticker(false, m.text.split(/\n| /i)[0], AUTOSTICKER_PACKNAME, AUTOSTICKER_AUTHOR);
            }
            if (stiker) {
                await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true, {
                    contextInfo: {
                        'forwardingScore': 200,
                        'isForwarded': false,
                        externalAdReply: {
                            showAdAttribution: false,
                            title: GT_URL,
                            body: ' 😻 𝗦𝘂𝗽𝗲𝗿 Admin-TK - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 ',
                            mediaType: 2,
                            thumbnail: GATA_IMG_URL,
                            sourceUrl: ACCOUNTSGB_URL
                        }
                    }
                }, { quoted: m });
            }
        }
    }
    static isUrl(text) {
        return text.match(new RegExp(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png|mp4)/, 'gi')) !== null;
    }
}
export default new AutostickerPlugin();
//# sourceMappingURL=autosticker_plugin.js.map