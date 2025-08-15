import { RENTAR2_NO_LINK, RENTAR2_INVALID_LINK, RENTAR2_NO_TOKENS, RENTAR2_ALREADY_IN_GROUP, RENTAR2_JOIN_ERROR, RENTAR2_SUCCESS, RENTAR2_WELCOME_MESSAGE, RENTAR2_ERROR } from '../../content/administracion_grupos/rentar_bot_grupo-responses';
import { RENTAR_BOT_WELCOME_VIDEO_URL } from '../../../config/redes_sociales/socialMediaConfig';
class RentarBotGrupoPlugin {
    name = "RentarBotGrupoPlugin";
    commands = [
        {
            name: "rentar_bot_grupo",
            alias: ["rentar2"],
            desc: "Renta el bot para un grupo usando un enlace de invitación.",
            category: "Administración/Grupos",
            react: "🤖",
            execute: async (Yaka, m, { conn, text, isOwner }) => {
                try {
                    if (!text) {
                        return m.reply(RENTAR2_NO_LINK);
                    }
                    let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i;
                    let [_, code] = text.match(linkRegex) || [];
                    if (!code) {
                        return m.reply(RENTAR2_INVALID_LINK);
                    }
                    global.db.data.groupRents = global.db.data.groupRents || {};
                    let userRents = global.db.data.userRents[m.sender];
                    if (!userRents || userRents.tokens <= 0) {
                        return m.reply(RENTAR2_NO_TOKENS);
                    }
                    let groupMetadata;
                    try {
                        groupMetadata = await conn.groupAcceptInvite(code);
                    }
                    catch (e) {
                        if (e.message === 'already-exists') {
                            return m.reply(RENTAR2_ALREADY_IN_GROUP);
                        }
                        return m.reply(RENTAR2_JOIN_ERROR(e.message));
                    }
                    let groupId = groupMetadata.id;
                    global.db.data.groupRents[groupId] = {
                        user: m.sender,
                        tokenCount: userRents.tokens,
                        startTime: Date.now(),
                        duration: userRents.tokens * 24 * 60 * 60 * 1000
                    };
                    userRents.tokens = 0;
                    userRents.groups.push(groupId);
                    conn.reply(m.chat, RENTAR2_SUCCESS(groupId, global.db.data.groupRents[groupId].tokenCount), m);
                    let chats = global.db.data.chats[groupId] || {};
                    chats.expired = global.db.data.groupRents[groupId].startTime + global.db.data.groupRents[groupId].duration;
                    global.db.data.chats[groupId] = chats;
                    await conn.sendMessage(groupMetadata.id, { video: { url: RENTAR_BOT_WELCOME_VIDEO_URL }, gifPlayback: true, caption: RENTAR2_WELCOME_MESSAGE, mentions: [m.sender] }, { quoted: estilo });
                }
                catch (error) {
                    console.error("Error en el comando de renta del bot:", error);
                    m.reply(RENTAR2_ERROR);
                }
            }
        }
    ];
}
export default RentarBotGrupoPlugin;
//# sourceMappingURL=rentar_bot_grupo_plugin.js.map