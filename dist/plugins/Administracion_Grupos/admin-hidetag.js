import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import { HIDETAG_NO_TEXT, HIDETAG_DEFAULT_TEXT } from '../../content/administracion_grupos/hidetag-responses';
class HidetagPlugin {
    name = 'HidetagPlugin';
    commands = [
        {
            name: 'hidetag',
            alias: ['notificar', 'notify', 'tag'],
            desc: 'Menciona a todos los miembros de un grupo de forma oculta.',
            category: 'Administración/Grupos',
            react: '📣',
            execute: async (Yaka, m, { conn, text, participants, isOwner, isAdmin }) => {
                if (!m.quoted && !text)
                    return conn.reply(m.chat, HIDETAG_NO_TEXT, m, rcanal);
                try {
                    const users = participants.map(u => conn.decodeJid(u.id));
                    const q = m.quoted ? m.quoted : m;
                    const c = m.quoted ? await m.getQuotedObj() : m.msg;
                    const msg = conn.cMod(m.chat, generateWAMessageFromContent(m.chat, { [m.quoted ? q.mtype : 'extendedTextMessage']: m.quoted ? c.message[q.mtype] : { text: '' || c } }, { quoted: null, userJid: conn.user.id }), text || q.text, conn.user.jid, { mentions: users });
                    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
                }
                catch {
                    const users = participants.map(u => conn.decodeJid(u.id));
                    const quoted = m.quoted ? m.quoted : m;
                    const mime = (quoted.msg || quoted).mimetype || '';
                    const isMedia = /image|video|sticker|audio/.test(mime);
                    const more = String.fromCharCode(8206);
                    const masss = more.repeat(850);
                    const htextos = `${text ? text : HIDETAG_DEFAULT_TEXT}`;
                    if ((isMedia && quoted.mtype === 'imageMessage') && htextos) {
                        const mediax = await quoted.download?.();
                        conn.sendMessage(m.chat, { image: mediax, mentions: users, caption: htextos }, { quoted: null });
                    }
                    else if ((isMedia && quoted.mtype === 'videoMessage') && htextos) {
                        const mediax = await quoted.download?.();
                        conn.sendMessage(m.chat, { video: mediax, mentions: users, mimetype: 'video/mp4', caption: htextos }, { quoted: null });
                    }
                    else if ((isMedia && quoted.mtype === 'audioMessage') && htextos) {
                        const mediax = await quoted.download?.();
                        conn.sendMessage(m.chat, { audio: mediax, mentions: users, mimetype: 'audio/mp4', fileName: `Hidetag.mp3` }, { quoted: null });
                    }
                    else if ((isMedia && quoted.mtype === 'stickerMessage') && htextos) {
                        const mediax = await quoted.download?.();
                        conn.sendMessage(m.chat, { sticker: mediax, mentions: users }, { quoted: null });
                    }
                    else {
                        await conn.relayMessage(m.chat, { extendedTextMessage: { text: `${masss}\n${htextos}\n`, ...{ contextInfo: { mentionedJid: users, externalAdReply: { thumbnail: icons, sourceUrl: redes } } } } }, {});
                    }
                }
            }
        }
    ];
}
export default HidetagPlugin;
//# sourceMappingURL=admin-hidetag.js.map