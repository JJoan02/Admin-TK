import { Command } from '../../core/Command.js';
import axios from 'axios';
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import { instagramStalkMessages } from '../../lib/descargas-content.js';
class InstagramStalkCommand extends Command {
    #logger;
    constructor(logger) {
        super('igstalk', 'Obtiene información de perfil de Instagram. Uso: !igstalk <nombre de usuario>');
        this.#logger = logger;
        this.commands = ['igstalk', 'verig', 'igver'];
    }
    async execute(context) {
        const { m, conn, args, usedPrefix, command } = context;
        if (!args[0]) {
            await conn.reply(m.chat, instagramStalkMessages.noUsername(usedPrefix, command), m);
            return;
        }
        const username = args[0].replace(/^@/, '');
        const key = (await conn.sendMessage(m.chat, { text: global.wait }, { quoted: m })).key;
        try {
            await m.react(global.rwait);
            let profileData = null;
            try {
                const apiUrl = `${global.apis}/tools/igstalk?username=${encodeURIComponent(username)}`;
                const apiResponse = await fetch(apiUrl);
                const delius = await apiResponse.json();
                if (delius && delius.data) {
                    profileData = delius.data;
                }
            }
            catch (e) {
                this.#logger.warn(`apis-starlights-team falló para igstalk: ${e.message}`);
            }
            if (!profileData) {
                try {
                    const res2 = await fetch(`https://api.lolhuman.xyz/api/stalkig/${username}?apikey=${global.lolkeysapi}`);
                    const res3 = await res2.json();
                    if (res3.result) {
                        profileData = {
                            username: res3.result.username,
                            full_name: res3.result.fullname,
                            profile_picture: res3.result.photo_profile,
                            followers: res3.result.followers,
                            following: res3.result.following,
                            posts: res3.result.posts,
                            biography: res3.result.bio,
                            url: `https://instagram.com/${res3.result.username}`,
                            verified: res3.result.verified_profile,
                            private: res3.result.private_profile,
                        };
                    }
                }
                catch (e) {
                    this.#logger.warn(`lolhuman.xyz falló para igstalk: ${e.message}`);
                }
            }
            if (!profileData) {
                await conn.reply(m.chat, instagramStalkMessages.noProfileFound(username), m);
                await conn.sendMessage(m.chat, { text: global.waittttt, edit: key });
                await m.react('✖️');
                return;
            }
            const txt = instagramStalkMessages.profileInfo(profileData);
            await conn.sendFile(m.chat, profileData.profile_picture, 'insta_profile.jpg', txt, m, null, global.fake);
            await conn.sendMessage(m.chat, { text: global.waittttt, edit: key });
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error general al hacer igstalk: ${e.message}`);
            await conn.sendMessage(m.chat, { text: instagramStalkMessages.errorGeneral(usedPrefix, command), edit: key });
            await m.react('✖️');
        }
    }
}
export default InstagramStalkCommand;
//# sourceMappingURL=InstagramStalkCommand.js.map