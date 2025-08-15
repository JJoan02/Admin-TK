import { download, detail, search } from "../lib/anime";
import fetch from 'node-fetch';
import { ANIME_DOWNLOAD_NO_TEXT, ANIME_DOWNLOAD_INFO_HEADER, ANIME_DOWNLOAD_TITLE, ANIME_DOWNLOAD_DESCRIPTION, ANIME_DOWNLOAD_VOTES, ANIME_DOWNLOAD_RATING, ANIME_DOWNLOAD_GENRES, ANIME_DOWNLOAD_TOTAL_EPISODES, ANIME_DOWNLOAD_AVAILABLE_EPISODES, ANIME_DOWNLOAD_EPISODE_INSTRUCTIONS, ANIME_DOWNLOAD_NO_RESULTS, ANIME_DOWNLOAD_ERROR_PROCESSING, ANIME_DOWNLOAD_ALREADY_DOWNLOADING, ANIME_DOWNLOAD_INVALID_EPISODE_NUMBER, ANIME_DOWNLOAD_EPISODE_NOT_FOUND, ANIME_DOWNLOAD_NO_LANGUAGES_AVAILABLE, ANIME_DOWNLOAD_DOWNLOADING_EPISODE, ANIME_DOWNLOAD_ERROR_DOWNLOADING_EPISODE } from '../../content/descargas/anime-download-responses';
async function lang(episodes) {
    const list = [];
    for (const ep of episodes) {
        try {
            const dl = await download(ep.link);
            const langs = [];
            if (dl?.dl?.sub)
                langs.push('sub');
            if (dl?.dl?.dub)
                langs.push('dub');
            list.push({ ...ep, lang: langs });
        }
        catch {
            list.push({ ...ep, lang: [] });
        }
    }
    return list;
}
class AnimeDownloadPlugin {
    name = "AnimeDownloadPlugin";
    commands = [
        {
            name: "anime",
            alias: ["animedl", "animes"],
            desc: "Busca y descarga anime.",
            category: "Descargas",
            react: "🎬",
            execute: async (Yaka, m, { conn, text, args, usedPrefix, command }) => {
                if (!text)
                    return m.reply(ANIME_DOWNLOAD_NO_TEXT(usedPrefix, command));
                try {
                    if (text.includes('https://animeav1.com/media/')) {
                        m.react("⌛");
                        let info = await detail(args[0]);
                        let { title, altTitle, description, cover, votes, rating, total, genres } = info;
                        let episodes = await lang(info.episodes);
                        const gen = genres.join(', ');
                        let eps = episodes.map((e) => {
                            const epNum = e.ep;
                            return `• Episodio ${epNum} (${e.lang.includes('sub') ? 'SUB' : ''}${e.lang.includes('dub') ? (e.lang.includes('sub') ? ' & ' : '') + 'DUB' : ''})`;
                        }).join('\n');
                        let cap = `${ANIME_DOWNLOAD_INFO_HEADER}\n\n` +
                            `${ANIME_DOWNLOAD_TITLE} ${title} - ${altTitle}\n` +
                            `≡ ${ANIME_DOWNLOAD_DESCRIPTION} ${description}\n` +
                            `≡ ${ANIME_DOWNLOAD_VOTES} ${votes}\n` +
                            `≡ ${ANIME_DOWNLOAD_RATING} ${rating}\n` +
                            `≡ ${ANIME_DOWNLOAD_GENRES} ${gen}\n` +
                            `≡ ${ANIME_DOWNLOAD_TOTAL_EPISODES} ${total}\n` +
                            `≡ ${ANIME_DOWNLOAD_AVAILABLE_EPISODES}\n\n` +
                            `${eps}\n\n` +
                            ANIME_DOWNLOAD_EPISODE_INSTRUCTIONS;
                        let buffer = await (await fetch(cover)).arrayBuffer();
                        let sent = await conn.sendMessage(m.chat, { image: Buffer.from(buffer), caption: cap }, m);
                        conn.anime = conn.anime || {};
                        conn.anime[m.sender] = {
                            title,
                            episodes,
                            key: sent.key,
                            downloading: false,
                            timeout: setTimeout(() => delete conn.anime[m.sender], 600_000)
                        };
                    }
                    else {
                        m.react('🔍');
                        const results = await search(text);
                        if (results.length === 0) {
                            return conn.reply(m.chat, ANIME_DOWNLOAD_NO_RESULTS, m);
                        }
                        let cap = `◜ Anime - Search ◞\n`;
                        results.slice(0, 15).forEach((res, index) => {
                            cap += `\n\​`;
                            $;
                            {
                                index + 1;
                            }
                            `\n≡ 🌴 `;
                            Title: ` ${res.title}\n≡ 🌱 `;
                            Link: ` ${res.link}\n`;
                        });
                        let buffer = await (await fetch(global.logo)).arrayBuffer();
                        conn.relayMessage(m.chat, {
                            extendedTextMessage: {
                                text: cap,
                                contextInfo: {
                                    externalAdReply: {
                                        title: global.wm,
                                        mediaType: 1,
                                        previewType: 0,
                                        renderLargerThumbnail: true,
                                        thumbnail: Buffer.from(buffer),
                                        sourceUrl: ''
                                    }
                                }, mentions: [m.sender]
                            }
                        }, {});
                        m.react("🌱");
                    }
                }
                catch (error) {
                    console.error('Error en handler anime:', error);
                    conn.reply(m.chat, ANIME_DOWNLOAD_ERROR_PROCESSING(error.message), m);
                }
            }
        }
    ];
    async before(m, { conn }) {
        conn.anime = conn.anime || {};
        const session = conn.anime[m.sender];
        if (!session || !m.quoted || m.quoted.id !== session.key.id)
            return;
        if (session.downloading)
            return m.reply(ANIME_DOWNLOAD_ALREADY_DOWNLOADING);
        let [epStr, langInput] = m.text.trim().split(/\s+/);
        const epi = parseInt(epStr);
        let lang = langInput?.toLowerCase();
        if (isNaN(epi))
            return m.reply(ANIME_DOWNLOAD_INVALID_EPISODE_NUMBER);
        const episode = session.episodes.find((e) => parseInt(e.ep) === epi);
        if (!episode)
            return m.reply(ANIME_DOWNLOAD_EPISODE_NOT_FOUND(epi));
        const inf = await download(episode.link);
        const availableLangs = Object.keys(inf.dl || {});
        if (!availableLangs.length)
            return m.reply(ANIME_DOWNLOAD_NO_LANGUAGES_AVAILABLE(epi));
        if (!lang || !availableLangs.includes(lang)) {
            lang = availableLangs[0];
        }
        const idiomaLabel = lang === 'sub' ? 'sub español' : 'español latino';
        await m.reply(ANIME_DOWNLOAD_DOWNLOADING_EPISODE(session.title, epi, idiomaLabel));
        m.react("📥");
        session.downloading = true;
        try {
            const videoBuffer = await (await fetch(inf.dl[lang])).buffer();
            await conn.sendFile(m.chat, videoBuffer, `${session.title} - cap ${epi} ${idiomaLabel}.mp4`, '', m, false, {
                mimetype: 'video/mp4',
                asDocument: true
            });
            m.react("✅");
        }
        catch (err) {
            console.error('Error al descargar:', err);
            m.reply(ANIME_DOWNLOAD_ERROR_DOWNLOADING_EPISODE(err.message));
        }
        clearTimeout(session.timeout);
        delete conn.anime[m.sender];
    }
}
export default AnimeDownloadPlugin;
//# sourceMappingURL=dl-anime.js.map