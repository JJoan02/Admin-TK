import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import { HIDETAG_DEFAULT_TEXT, HIDETAG_AUDIO_FILENAME, TAG_NO_TEXT_OR_QUOTED } from '../../content/administracion_grupos/mencionar_oculto-responses';
import { BOT_ICONS_URL, BOT_SOCIAL_MEDIA_URL } from '../../../config/redes_sociales/socialMediaConfig';
class MencionarOcultoPlugin {
    name = "MencionarOcultoPlugin";
    commands = [
        {
            name: "mencionar_oculto",
            alias: ["hidetag", "notificar", "notify", "tag", "n", "noti"],
            desc: "Envía un mensaje que menciona a todos los miembros del grupo de forma oculta.",
            category: "Administración/Grupos",
            react: "🕵️",
            execute: async (Yaka, m, { conn, text, participants, isOwner, isAdmin, isGroup }) => {
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                if (!isAdmin) {
                    return m.reply("Necesitas ser administrador del grupo para usar este comando.");
                }
                if (!m.quoted && !text) {
                    return conn.reply(m.chat, TAG_NO_TEXT_OR_QUOTED, m, rcanal);
                }
                try {
                    let users = participants.map((u) => conn.decodeJid(u.id));
                    let q = m.quoted ? m.quoted : m || m.text || m.sender;
                    let c = m.quoted ? await m.getQuotedObj() : m.msg || m.text || m.sender;
                    let msg = conn.cMod(m.chat, generateWAMessageFromContent(m.chat, { [m.quoted ? q.mtype : 'extendedTextMessage']: m.quoted ? c.message[q.mtype] : { text: '' || c } }, { quoted: fkontak, userJid: conn.user.id }), text || q.text, conn.user.jid, { mentions: users });
                    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
                }
                catch (e) {
                    let users = participants.map((u) => conn.decodeJid(u.id));
                    let quoted = m.quoted ? m.quoted : m;
                    let mime = (quoted.msg || quoted).mimetype || '';
                    let isMedia = /image|video|sticker|audio/.test(mime);
                    let more = String.fromCharCode(8206);
                    let masss = more.repeat(850);
                    let htextos = `${text ? text : HIDETAG_DEFAULT_TEXT}`;
                    if ((isMedia && quoted.mtype === 'imageMessage') && htextos) {
                        var mediax = await quoted.download?.();
                        conn.sendMessage(m.chat, { image: mediax, mentions: users, caption: htextos, mentions: users }, { quoted: m });
                    }
                    else if ((isMedia && quoted.mtype === 'videoMessage') && htextos) {
                        var mediax = await quoted.download?.();
                        conn.sendMessage(m.chat, { video: mediax, mentions: users, mimetype: 'video/mp4', caption: htextos }, { quoted: m });
                    }
                    else if ((isMedia && quoted.mtype === 'audioMessage') && htextos) {
                        var mediax = await quoted.download?.();
                        conn.sendMessage(m.chat, { audio: mediax, mentions: users, mimetype: 'audio/mp4', fileName: HIDETAG_AUDIO_FILENAME }, { quoted: m });
                    }
                    else if ((isMedia && quoted.mtype === 'stickerMessage') && htextos) {
                        var mediax = await quoted.download?.();
                        conn.sendMessage(m.chat, { sticker: mediax, mentions: users }, { quoted: m });
                    }
                    else {
                        await conn.relayMessage(m.chat, { extendedTextMessage: { text: `${masss}\n${htextos}\n`, ...{ contextInfo: { mentionedJid: users, externalAdReply: { thumbnail: BOT_ICONS_URL, sourceUrl: BOT_SOCIAL_MEDIA_URL } } } } }, {});
                    }
                }
            }
        }
    ];
}
export default MencionarOcultoPlugin;
//# sourceMappingURL=mencionar_oculto_plugin.js.map