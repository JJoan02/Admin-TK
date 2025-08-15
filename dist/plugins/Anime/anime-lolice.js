import { ICommand, IPluginModule } from '../../types/plugin';
import { LOLICE_CAPTION, LOLICE_API_URL, LOLICE_DEFAULT_AVATAR } from '../../content/anime/lolice-responses';
class LolicePlugin {
    name = "LolicePlugin";
    commands = [
        {
            name: "lolice",
            alias: [],
            desc: "Genera una imagen de lolice con la foto de perfil de un usuario.",
            category: "Anime",
            react: "🚨",
            execute: async (Yaka, m, { conn, usedPrefix }) => {
                let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
                conn.sendFile(m.chat, Yaka.API(LOLICE_API_URL, {
                    avatar: await conn.profilePictureUrl(who).catch(_ => LOLICE_DEFAULT_AVATAR),
                }), '', LOLICE_CAPTION, m);
            }
        }
    ];
}
export default LolicePlugin;
//# sourceMappingURL=anime-lolice.js.map