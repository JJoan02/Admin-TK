import { Command } from '../../core/Command.js';
import uploadImage from '../../lib/uploadImage.js';
import { imageToAnimeMessages } from '../../lib/convertidor-content.js';
class ImageToAnimeCommand extends Command {
    #logger;
    #config;
    constructor(logger, config) {
        super('toanime', 'Convierte una imagen a estilo anime.');
        this.#logger = logger;
        this.#config = config;
        this.commands = ['jadianime', 'toanime'];
    }
    async execute(context) {
        const { m, conn } = context;
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || q.mediaType || '';
        if (!/image/g.test(mime)) {
            await conn.reply(m.chat, imageToAnimeMessages.noImage, m);
            return;
        }
        await conn.reply(m.chat, imageToAnimeMessages.processing, m);
        try {
            const data = await q.download?.();
            const image = await uploadImage(data);
            let animeUrl = null;
            if (this.#config.api.lolhumanApiKey) {
                try {
                    const lolhumanApiUrl = `https://api.lolhuman.xyz/api/imagetoanime?apikey=${this.#config.api.lolhumanApiKey}&img=${image}`;
                    const res = await fetch(lolhumanApiUrl);
                    if (res.ok) {
                        animeUrl = lolhumanApiUrl;
                    }
                    else {
                        this.#logger.warn(`Lolhuman API failed: ${res.status} ${res.statusText}`);
                    }
                }
                catch (e) {
                    this.#logger.warn(`Error with Lolhuman API: ${e.message}`);
                }
            }
            if (!animeUrl && this.#config.api.zahwazeinApiKey) {
                try {
                    const zahwazeinApiUrl = `https://api.zahwazein.xyz/photoeditor/jadianime?url=${image}&apikey=${this.#config.api.zahwazeinApiKey}`;
                    const res = await fetch(zahwazeinApiUrl);
                    if (res.ok) {
                        animeUrl = zahwazeinApiUrl;
                    }
                    else {
                        this.#logger.warn(`Zahwazein API failed: ${res.status} ${res.statusText}`);
                    }
                }
                catch (e) {
                    this.#logger.warn(`Error with Zahwazein API: ${e.message}`);
                }
            }
            if (!animeUrl && this.#config.api.caliphApiKey) {
                try {
                    const caliphApiUrl = `https://api.caliph.biz.id/api/animeai?img=${image}&apikey=${this.#config.api.caliphApiKey}`;
                    const res = await fetch(caliphApiUrl);
                    if (res.ok) {
                        animeUrl = caliphApiUrl;
                    }
                    else {
                        this.#logger.warn(`Caliph API failed: ${res.status} ${res.statusText}`);
                    }
                }
                catch (e) {
                    this.#logger.warn(`Error with Caliph API: ${e.message}`);
                }
            }
            if (animeUrl) {
                await conn.sendFile(m.chat, animeUrl, 'anime.jpg', null, m);
            }
            else {
                await conn.reply(m.chat, imageToAnimeMessages.error, m);
            }
        }
        catch (e) {
            this.#logger.error(`Error in ImageToAnimeCommand: ${e.message}`);
            await conn.reply(m.chat, imageToAnimeMessages.error, m);
        }
    }
}
export default ImageToAnimeCommand;
//# sourceMappingURL=ImageToAnimeCommand.js.map