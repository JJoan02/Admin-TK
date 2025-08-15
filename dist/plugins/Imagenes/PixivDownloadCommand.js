import { Command } from '../../core/Command.js';
import { URL_REGEX } from '@whiskeysockets/baileys';
import { fileTypeFromBuffer } from 'file-type';
import { Pixiv } from '@ibaraki-douji/pixivts';
import { pixivDownloadMessages } from '../../lib/imagenes-content.js';
const pixiv = new Pixiv();
class PixivDownloadCommand extends Command {
    #logger;
    constructor(logger) {
        super('pixiv', 'Descarga imágenes de Pixiv.');
        this.#logger = logger;
        this.commands = ['pixiv', 'pixivdl'];
    }
    async execute(context) {
        const { m, conn, text } = context;
        if (!text) {
            await conn.reply(m.chat, pixivDownloadMessages.noText, m);
            return;
        }
        try {
            await m.react('🕓');
            const res = await this.#pixivDl(text);
            if (!res) {
                await conn.reply(m.chat, pixivDownloadMessages.notFound, m);
                await m.react('✖️');
                return;
            }
            for (let i = 0; i < res.media.length; i++) {
                const caption = i === 0 ? pixivDownloadMessages.result(res.caption, res.artist, res.tags) : '';
                const mime = (await fileTypeFromBuffer(res.media[i])).mime;
                await conn.sendMessage(m.chat, { [mime.split('/')[0]]: res.media[i], caption, mimetype: mime }, { quoted: m });
            }
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error in PixivDownloadCommand: ${e.message}`);
            await m.react('✖️');
            await conn.reply(m.chat, pixivDownloadMessages.error, m);
        }
    }
    async #pixivDl(query) {
        if (query.match(URL_REGEX)) {
            if (!/https:\/\/www.pixiv.net\/en\/artworks\/[0-9]+/i.test(query))
                return null;
            query = query.replace(/\D/g, '');
            const res = await pixiv.getIllustByID(query).catch(() => null);
            if (!res)
                return null;
            const media = [];
            for (let x = 0; x < res.urls.length; x++)
                media.push(await pixiv.download(new URL(res.urls[x].original)));
            return {
                artist: res.user.name, caption: res.title, tags: res.tags.tags.map(v => v.tag), media
            };
        }
        else {
            let res = await pixiv.getIllustsByTag(query);
            if (!res.length)
                return null;
            res = res[~~(Math.random() * res.length)].id;
            res = await pixiv.getIllustByID(res);
            const media = [];
            for (let x = 0; x < res.urls.length; x++)
                media.push(await pixiv.download(new URL(res.urls[x].original)));
            return {
                artist: res.user.name, caption: res.title, tags: res.tags.tags.map(v => v.tag), media
            };
        }
    }
}
export default PixivDownloadCommand;
//# sourceMappingURL=PixivDownloadCommand.js.map