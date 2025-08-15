import { Command } from '../../core/Command.js';
import FormData from "form-data";
import Jimp from "jimp";
import { imageEnhanceMessages } from '../../lib/herramientas-content.js';
class ImageEnhanceCommand extends Command {
    #logger;
    constructor(logger) {
        super('enhance', 'Mejora la calidad de una imagen. Uso: !enhance (respondiendo a una imagen)');
        this.#logger = logger;
        this.commands = ['remini', 'hd', 'enhance'];
    }
    async execute(context) {
        const { m, conn, usedPrefix, command } = context;
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || "";
        if (!mime) {
            await conn.reply(m.chat, imageEnhanceMessages.noImage(usedPrefix, command), m);
            return;
        }
        if (!/image\/(jpe?g|png)/.test(mime)) {
            await conn.reply(m.chat, imageEnhanceMessages.invalidFormat(mime), m);
            return;
        }
        try {
            await m.react(global.rwait);
            await conn.reply(m.chat, imageEnhanceMessages.processing, m);
            let img = await q.download?.();
            let pr = await this.#remini(img, "enhance");
            await conn.sendMessage(m.chat, { image: pr }, { quoted: m });
            await conn.reply(m.chat, imageEnhanceMessages.success, m);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al mejorar imagen: ${e.message}`);
            await conn.reply(m.chat, imageEnhanceMessages.error, m);
            await m.react('✖️');
        }
    }
    async #remini(imageData, operation) {
        return new Promise(async (resolve, reject) => {
            const availableOperations = ["enhance", "recolor", "dehaze"];
            if (availableOperations.includes(operation)) {
                operation = operation;
            }
            else {
                operation = availableOperations[0];
            }
            const baseUrl = "https://inferenceengine.vyro.ai/" + operation + ".vyro";
            const formData = new FormData();
            formData.append("image", Buffer.from(imageData), { filename: "enhance_image_body.jpg", contentType: "image/jpeg" });
            formData.append("model_version", 1, { "Content-Transfer-Encoding": "binary", contentType: "multipart/form-data; charset=utf-8" });
            formData.submit({ url: baseUrl, host: "inferenceengine.vyro.ai", path: "/" + operation, protocol: "https:", headers: { "User-Agent": "okhttp/4.9.3", Connection: "Keep-Alive", "Accept-Encoding": "gzip" } }, function (err, res) {
                if (err)
                    reject(err);
                const chunks = [];
                res.on("data", function (chunk) { chunks.push(chunk); });
                res.on("end", function () { resolve(Buffer.concat(chunks)); });
                res.on("error", function (err) {
                    reject(err);
                });
            });
        });
    }
}
export default ImageEnhanceCommand;
//# sourceMappingURL=ImageEnhanceCommand.js.map