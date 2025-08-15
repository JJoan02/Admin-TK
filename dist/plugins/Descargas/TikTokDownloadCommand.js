import { Command } from '../../core/CommandBus.js';
import _ from 'lodash';
import fetch from 'node-fetch';
import { downloaderMessages } from '../content/descargas-content.js';
export class TikTokDownloadCommand extends Command {
    constructor() {
        super();
        this.name = 'tiktok';
        this.description = 'Descarga videos de TikTok.';
        this.commands = ['tiktok'];
        this.tags = ['descargas'];
        this.help = ['tiktok <url>'];
    }
    async execute(context) {
        const { conn, m, command, usedPrefix, args } = context;
        const text = _.get(args, "length") ? args.join(" ") : _.get(m, "quoted.text") || _.get(m, "quoted.caption") || _.get(m, "quoted.description") || "";
        if (!text.trim()) {
            return m.reply(downloaderMessages.tiktokUsage(usedPrefix, command));
        }
        if (!text.match(/tiktok/gi)) {
            return m.reply(downloaderMessages.tiktokInvalidLink);
        }
        await m.react("🕒");
        try {
            const searchResponse = await fetch(`https://deliriussapi-oficial.vercel.app/download/tiktok?url=${encodeURIComponent(text)}`);
            const searchResult = await searchResponse.json();
            if (!searchResult.status || !searchResult.data) {
                return m.reply(downloaderMessages.tiktokNoDownload);
            }
            const { title, author, duration, play, no_watermark, image } = searchResult.data;
            const captvid = `${downloaderMessages.tiktokDownloadHeader}\n\n` +
                `${downloaderMessages.tiktokTitle}: ${title || "No encontrado"}\n` +
                `${downloaderMessages.tiktokAuthor}: ${author || "No encontrado"}\n` +
                `${downloaderMessages.tiktokDuration}: ${duration || "No disponible"}\n` +
                `${downloaderMessages.tiktokPublished}: ${searchResult.data.publish || "No disponible"}\n` +
                `${downloaderMessages.tiktokViews}: ${searchResult.data.views || "No disponible"}\n` +
                `${downloaderMessages.tiktokLikes}: ${searchResult.data.likes || "No disponible"}\n` +
                `${downloaderMessages.tiktokComments}: ${searchResult.data.comments || "No disponible"}\n` +
                `${downloaderMessages.tiktokShares}: ${searchResult.data.shares || "No disponible"}\n`;
            const thumbnail = (await conn.getFile(image))?.data;
            const infoReply = {
                contextInfo: {
                    externalAdReply: {
                        body: "✧ En unos momentos se entrega su video",
                        mediaType: 1,
                        mediaUrl: text,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        sourceUrl: text,
                        thumbnail: thumbnail,
                        title: "T I K T O K - V I D E O",
                    },
                },
            };
            await conn.reply(m.chat, captvid, m, infoReply);
            if (no_watermark) {
                await conn.sendMessage(m.chat, { video: { url: no_watermark }, caption: captvid, mimetype: "video/mp4", contextInfo: infoReply.contextInfo }, { quoted: m });
            }
            else if (play) {
                await conn.sendMessage(m.chat, { video: { url: play }, caption: captvid, mimetype: "video/mp4", contextInfo: infoReply.contextInfo }, { quoted: m });
            }
            else {
                return m.reply(downloaderMessages.tiktokNoVideoNoWatermark);
            }
            await m.react("✅");
        }
        catch (error) {
            console.error("Error en el handler de TikTok:", error);
            return m.reply(downloaderMessages.tiktokErrorProcessing);
        }
    }
}
//# sourceMappingURL=TikTokDownloadCommand.js.map