import { ICommand, IPluginModule } from '../../types/plugin';
import axios from 'axios';
import { THREADS_NO_URL, THREADS_NO_ID, THREADS_RETRIEVING_DATA, THREADS_NO_DATA, THREADS_MESSAGE_HEADER, THREADS_MESSAGE_USERNAME, THREADS_MESSAGE_VERIFIED, THREADS_MESSAGE_FOLLOWERS, THREADS_MESSAGE_CAPTION, THREADS_MESSAGE_LIKES, THREADS_ERROR } from '../../content/descargas/threads-download-responses';
class ThreadsDownloadPlugin {
    name = "ThreadsDownloadPlugin";
    commands = [
        {
            name: "threads",
            alias: ["tredl"],
            desc: "Descarga medios de una publicación de Threads.net.",
            category: "Descargas",
            react: "🧵",
            execute: async (Yaka, m, { conn, args, usedPrefix, command }) => {
                let url = args[0] || (m.quoted && m.quoted.text);
                if (!url || !url.includes('/post/')) {
                    return m.reply(THREADS_NO_URL(usedPrefix, command));
                }
                let threadId = url.match();
                if (!threadId)
                    return m.reply(THREADS_NO_ID);
                try {
                    m.reply(THREADS_RETRIEVING_DATA);
                    const res = await axios.get(`https://www.dolphinradar.com/api/threads/post_detail/${threadId}`, {
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, como Gecko) Chrome/138.0.0.0 Mobile Safari/537.36',
                            'Accept': 'application/json'
                        }
                    });
                    const data = res.data?.data;
                    if (!data || !data.post_detail || !data.user)
                        throw THREADS_NO_DATA;
                    const { post_detail: post, user } = data;
                    const media = post.media_list || [];
                    const mediaUrls = media.map((m) => m.url);
                    let mensaje = `${THREADS_MESSAGE_HEADER} ${user.full_name}\n`;
                    mensaje += `${THREADS_MESSAGE_USERNAME} @${user.username}\n`;
                    mensaje += `${THREADS_MESSAGE_VERIFIED} ${user.verified ? 'Sí' : 'No'}\n`;
                    mensaje += `${THREADS_MESSAGE_FOLLOWERS} ${user.follower_count}\n\n`;
                    mensaje += `${THREADS_MESSAGE_CAPTION}${post.caption_text || '-'}\n\n`;
                    mensaje += `${THREADS_MESSAGE_LIKES} ${post.like_count}`;
                    for (let i = 0; i < mediaUrls.length; i++) {
                        await conn.sendFile(m.chat, mediaUrls[i], null, i === 0 ? mensaje : '', m);
                    }
                }
                catch (err) {
                    console.error(err);
                    m.reply(THREADS_ERROR(err?.message || err));
                }
            }
        }
    ];
}
export default ThreadsDownloadPlugin;
//# sourceMappingURL=descargar-threads.js.map