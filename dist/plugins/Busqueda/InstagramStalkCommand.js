import fetch from 'node-fetch';
import { INSTAGRAM_STALK_NO_USERNAME, INSTAGRAM_STALK_NO_PROFILE_FOUND, INSTAGRAM_STALK_PROFILE_HEADER, INSTAGRAM_STALK_FULL_NAME, INSTAGRAM_STALK_USERNAME, INSTAGRAM_STALK_BIO, INSTAGRAM_STALK_NO_BIO, INSTAGRAM_STALK_FOLLOWERS, INSTAGRAM_STALK_FOLLOWING, INSTAGRAM_STALK_POSTS, INSTAGRAM_STALK_PROFILE_URL, INSTAGRAM_STALK_ERROR_GENERAL } from '../../content/busqueda/instagram-stalk-responses';
class InstagramStalkPlugin {
    name = "InstagramStalkPlugin";
    commands = [
        {
            name: "igstalk",
            alias: ["instagramstalk"],
            desc: "Realiza un stalk a un perfil de Instagram.",
            category: "Busqueda",
            react: "📸",
            execute: async (Yaka, m, { conn, text, usedPrefix, command }) => {
                if (!text) {
                    return conn.reply(m.chat, INSTAGRAM_STALK_NO_USERNAME(usedPrefix, command), m);
                }
                await conn.sendMessage(m.chat, { react: { text: '🕓', key: m.key } });
                try {
                    const res = await fetch(`https://delirius-apiofc.vercel.app/tools/igstalk?username=${encodeURIComponent(text)}`);
                    const json = await res.json();
                    if (!json.data) {
                        await conn.sendMessage(m.chat, { react: { text: '✖️', key: m.key } });
                        return conn.reply(m.chat, INSTAGRAM_STALK_NO_PROFILE_FOUND(text), m);
                    }
                    const user = json.data;
                    let txt = INSTAGRAM_STALK_PROFILE_HEADER;
                    txt += `${INSTAGRAM_STALK_FULL_NAME} ${user.full_name}\n`;
                    txt += `${INSTAGRAM_STALK_USERNAME} ${user.username}\n`;
                    txt += `${INSTAGRAM_STALK_BIO} ${user.biography || INSTAGRAM_STALK_NO_BIO}\n`;
                    txt += `${INSTAGRAM_STALK_FOLLOWERS} ${user.followers}\n`;
                    txt += `${INSTAGRAM_STALK_FOLLOWING} ${user.following}\n`;
                    txt += `${INSTAGRAM_STALK_POSTS} ${user.posts}\n`;
                    txt += `${INSTAGRAM_STALK_PROFILE_URL} ${user.url}\n\n`;
                    await conn.sendMessage(m.chat, { image: { url: user.profile_picture }, caption: txt }, { quoted: m });
                    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
                }
                catch (error) {
                    console.error(error);
                    await conn.sendMessage(m.chat, { react: { text: '✖️', key: m.key } });
                    await conn.reply(m.chat, INSTAGRAM_STALK_ERROR_GENERAL(usedPrefix, command), m);
                }
            }
        }
    ];
}
export default InstagramStalkPlugin;
//# sourceMappingURL=InstagramStalkCommand.js.map