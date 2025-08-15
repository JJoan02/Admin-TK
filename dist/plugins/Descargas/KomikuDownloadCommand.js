import { Command } from '../../core/Command.js';
import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs/promises";
import archiver from "archiver";
import { join } from "path";
class KomikuDownloadCommand extends Command {
    #logger;
    constructor(logger) {
        super('komikudl', 'Descarga imágenes de una URL de Komiku y las comprime en un ZIP. Uso: !komikudl <url>');
        this.#logger = logger;
    }
    async execute(context) {
        const { m, conn, text } = context;
        const targetUrl = text.trim();
        if (!targetUrl || !/^https?:\/\/[^\s]+$/.test(targetUrl)) {
            return m.reply("Por favor, proporciona una URL válida.");
        }
        try {
            await m.react('🕒');
            await conn.reply(m.chat, "🔄 Descargando imágenes, por favor espera...", m);
            const images = await this.#extractImages(targetUrl);
            if (images.length === 0) {
                return m.reply("No se encontraron imágenes en esa página.");
            }
            await conn.reply(m.chat, `✅ Se encontraron ${images.length} imágenes. Procesando...`, m);
            const tempDir = join(process.cwd(), "tmp", m.sender.split('@')[0]);
            await fs.mkdir(tempDir, { recursive: true });
            const downloadedFiles = [];
            for (let i = 0; i < images.length; i++) {
                const imgUrl = images[i];
                const filename = `image_${i + 1}.jpg`;
                const filepath = join(tempDir, filename);
                const imgResponse = await axios.get(imgUrl, { responseType: "arraybuffer" });
                await fs.writeFile(filepath, Buffer.from(imgResponse.data));
                downloadedFiles.push(filepath);
            }
            const zipFilename = join(process.cwd(), `komikudl_${m.sender.split('@')[0]}.zip`);
            const output = fs.createWriteStream(zipFilename);
            const archive = archiver("zip", { zlib: { level: 9 } });
            output.on("close", async () => {
                await m.react('✅');
                await conn.sendFile(m.chat, zipFilename, zipFilename, "📦 Archivo comprimido listo.", m);
                setTimeout(async () => {
                    await fs.unlink(zipFilename).catch(e => this.#logger.error(`Error al eliminar zip: ${e.message}`));
                    await fs.rm(tempDir, { recursive: true, force: true }).catch(e => this.#logger.error(`Error al eliminar temp dir: ${e.message}`));
                }, 10000);
            });
            archive.on("error", (err) => {
                throw err;
            });
            archive.pipe(output);
            archive.directory(tempDir, false);
            archive.finalize();
        }
        catch (error) {
            this.#logger.error(`Error en KomikuDownloadCommand: ${error.message}`);
            m.reply(`❌ Ocurrió un error: ${error.message}`);
            await m.react('✖️');
        }
    }
    async #extractImages(url) {
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:117.0) Gecko/20100101 Firefox/117.0",
                "Accept-Language": "es-ES,es;q=0.9"
            }
        });
        const $ = cheerio.load(response.data);
        const images = [];
        $("img[itemprop='image']").each((_, el) => {
            const imgUrl = $(el).attr("src");
            if (imgUrl)
                images.push(imgUrl);
        });
        return images;
    }
}
export default KomikuDownloadCommand;
//# sourceMappingURL=KomikuDownloadCommand.js.map