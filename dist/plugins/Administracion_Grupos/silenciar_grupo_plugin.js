import fetch from 'node-fetch';
import { MUTE_PERMISSION_DENIED, MUTE_CREATOR_ERROR, MUTE_BOT_SELF_ERROR, MUTE_GROUP_OWNER_ERROR, MUTE_NO_MENTION, MUTE_ALREADY_MUTED, MUTE_SUCCESS_MESSAGE, UNMUTE_NOT_ADMIN_ERROR, UNMUTE_NO_MENTION, UNMUTE_NOT_MUTED, UNMUTE_SUCCESS_MESSAGE, VCARD_DATA } from '../../content/silenciar-responses';
import { MUTE_THUMBNAIL_URL, UNMUTE_THUMBNAIL_URL } from '../../../config/redes_sociales/socialMediaConfig';
class SilenciarGrupoPlugin {
    name = "SilenciarGrupoPlugin";
    commands = [
        {
            name: "silenciar",
            alias: ["mute"],
            desc: "Silencia a un miembro del grupo.",
            category: "Administración/Grupos",
            react: "🔇",
            execute: async (Yaka, m, { conn, command, text, isAdmin }) => {
                if (!isAdmin) {
                    throw MUTE_PERMISSION_DENIED;
                }
                const ownerBot = global.owner[0][0] + "@s.whatsapp.net";
                if (m.mentionedJid[0] === ownerBot) {
                    throw MUTE_CREATOR_ERROR;
                }
                let targetJid = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
                if (targetJid === conn.user.jid) {
                    throw MUTE_BOT_SELF_ERROR;
                }
                const groupMetadata = await conn.groupMetadata(m.chat);
                const groupOwner = groupMetadata.owner || m.chat.split('-')[0] + "@s.whatsapp.net";
                if (m.mentionedJid[0] === groupOwner) {
                    throw MUTE_GROUP_OWNER_ERROR;
                }
                let userDb = global.db.data.users[targetJid];
                if (!userDb) {
                    global.db.data.users[targetJid] = {};
                }
                if (!m.mentionedJid[0] && !m.quoted) {
                    return conn.reply(m.chat, MUTE_NO_MENTION, m);
                }
                if (userDb.muto === true) {
                    throw MUTE_ALREADY_MUTED;
                }
                const thumbnailBuffer = await (await fetch(MUTE_THUMBNAIL_URL)).buffer();
                let messageOptions = {
                    'key': {
                        'participants': "0@s.whatsapp.net",
                        'fromMe': false,
                        'id': "Halo"
                    },
                    'message': {
                        'locationMessage': {
                            'name': " ",
                            'jpegThumbnail': thumbnailBuffer,
                            'vcard': VCARD_DATA
                        }
                    },
                    'participant': "0@s.whatsapp.net"
                };
                conn.reply(m.chat, MUTE_SUCCESS_MESSAGE, messageOptions, null, {
                    'mentions': [targetJid]
                });
                userDb.muto = true;
            }
        },
        {
            name: "desilenciar",
            alias: ["unmute"],
            desc: "Desilencia a un miembro del grupo.",
            category: "Administración/Grupos",
            react: "🔊",
            execute: async (Yaka, m, { conn, command, text, isAdmin }) => {
                if (!isAdmin) {
                    throw UNMUTE_NOT_ADMIN_ERROR;
                }
                let targetJid = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
                let userDb = global.db.data.users[targetJid];
                if (!userDb) {
                    global.db.data.users[targetJid] = {};
                }
                if (targetJid === m.sender) {
                    throw UNMUTE_NOT_ADMIN_ERROR;
                }
                if (!m.mentionedJid[0] && !m.quoted) {
                    return conn.reply(m.chat, UNMUTE_NO_MENTION, m);
                }
                if (userDb.muto === false) {
                    throw UNMUTE_NOT_MUTED;
                }
                userDb.muto = false;
                const thumbnailBuffer = await (await fetch(UNMUTE_THUMBNAIL_URL)).buffer();
                let messageOptions = {
                    'key': {
                        'participants': "0@s.whatsapp.net",
                        'fromMe': false,
                        'id': "Halo"
                    },
                    'message': {
                        'locationMessage': {
                            'name': " ",
                            'jpegThumbnail': thumbnailBuffer,
                            'vcard': VCARD_DATA
                        }
                    },
                    'participant': "0@s.whatsapp.net"
                };
                conn.reply(m.chat, UNMUTE_SUCCESS_MESSAGE, messageOptions, null, {
                    'mentions': [targetJid]
                });
            }
        }
    ];
}
export default SilenciarGrupoPlugin;
//# sourceMappingURL=silenciar_grupo_plugin.js.map