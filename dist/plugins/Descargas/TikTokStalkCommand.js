import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
class TikTokStalkCommand extends Command {
    #logger;
    constructor(logger) {
        super('tiktokstalk', 'Obtiene información de perfil de TikTok. Uso: !tiktokstalk <nombre de usuario>');
        this.#logger = logger;
        this.commands = ['tiktokstalk', 'ttstalk'];
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        if (!text) {
            await conn.reply(m.chat, `${global.lenguajeGB.smsAvisoMG()}${global.mid.smsTikTok6}\n*${usedPrefix + command} Gata_Dios*`, m);
            return;
        }
        try {
            await m.react(global.rwait);
            let profileData = null;
            try {
                const apiUrl = `${global.apis}/tools/tiktokstalk?q=${encodeURIComponent(text)}`;
                const apiResponse = await fetch(apiUrl);
                const delius = await apiResponse.json();
                if (delius && delius.result && delius.result.users) {
                    profileData = {
                        username: delius.result.users.username,
                        nickname: delius.result.users.nickname,
                        verified: delius.result.users.verified,
                        followers: delius.result.stats.followerCount.toLocaleString(),
                        following: delius.result.stats.followingCount.toLocaleString(),
                        likes: delius.result.stats.heartCount.toLocaleString(),
                        videos: delius.result.stats.videoCount.toLocaleString(),
                        bio: delius.result.users.signature,
                        avatar: delius.result.users.avatarLarger,
                        url: delius.result.users.url,
                    };
                }
            }
            catch (e) {
                this.#logger.warn(`apis/tools/tiktokstalk falló: ${e.message}`);
            }
            if (!profileData) {
                try {
                    const res = await fetch(`https://api.lolhuman.xyz/api/stalktiktok/${text}?apikey=${global.lolkeysapi}`);
                    const json = await res.json();
                    if (json.status === 200 && json.result) {
                        profileData = {
                            username: json.result.username,
                            nickname: json.result.nickname,
                            verified: json.result.verified,
                            followers: json.result.followers,
                            following: json.result.followings,
                            likes: json.result.likes,
                            videos: json.result.video,
                            bio: json.result.bio,
                            avatar: json.result.user_picture,
                            url: `https://www.tiktok.com/@${json.result.username}`,
                        };
                    }
                }
                catch (e) {
                    this.#logger.warn(`api.lolhuman.xyz falló para tiktokstalk: ${e.message}`);
                }
            }
            if (!profileData) {
                await conn.reply(m.chat, `No se encontró información de perfil para "${text}".`, m);
                await m.react('✖️');
                return;
            }
            const gata = `👤 ${global.mid.user} 
 ${profileData.username}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
✨ ${global.mid.name}
${profileData.nickname}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
✅️ VERIFICADO 
${profileData.verified ? 'Sí' : 'No'}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
💖 ${global.mid.smsinsta1}
 ${profileData.followers}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
❇️ ${global.mid.smsinsta2}
${profileData.following}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
❤️ ${global.mid.smsinsta5}
 ${profileData.likes}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
🎁 ${global.mid.smsinsta3}
${profileData.videos}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
👀 FIRMAR:
${profileData.bio}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
*○ URL*: 
${profileData.url}`.trim();
            await conn.sendFile(m.chat, profileData.avatar, 'tiktok_profile.jpg', gata, m);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error general al hacer TikTok stalk: ${e.message}`);
            await conn.reply(m.chat, `${global.lenguajeGB.smsMalError3()}#report ${global.lenguajeGB.smsMensError2()} ${usedPrefix + command}\n\n${global.wm}`, m);
            await m.react('✖️');
        }
    }
}
export default TikTokStalkCommand;
//# sourceMappingURL=TikTokStalkCommand.js.map