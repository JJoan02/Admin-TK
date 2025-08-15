import { ICommand, IPluginModule } from '../../types/plugin';
import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";
import * as archiver from "archiver";
import { join } from "path";
import { KOMIKU_NO_URL, KOMIKU_DOWNLOADING_IMAGES, KOMIKU_NO_IMAGES_FOUND, KOMIKU_IMAGES_FOUND, KOMIKU_ZIP_READY, KOMIKU_ERROR } from '../../content/descargas/komiku-download-responses';
const HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:117.0) Gecko/20100101 Firefox/117.0",
    "Accept-Language": "es-ES,es;q=0.9"
};
class KomikuDownloadPlugin {
    name = "KomikuDownloadPlugin";
    commands = [
        {
            name: "komikudl",
            alias: [],
            desc: "Descarga imágenes de una URL de Komiku.id y las comprime en un ZIP.",
            category: "Descargas",
            react: "📚",
            execute: async (Yaka, m, { conn, text }) => {
                if (!text || !/^https?:\/\/[^\s]+$/.test(text)) {
                    return m.reply(KOMIKU_NO_URL);
                }
                const targetUrl = text.trim();
                try {
                    m.reply(KOMIKU_DOWNLOADING_IMAGES);
                    await m.react('🕓');
                    const response = await axios.get(targetUrl, { headers: HEADERS });
                    const $ = cheerio.load(response.data);
                    const images = [];
                    $("img[itemprop='image']").each((_, el) => {
                        const imgUrl = $(el).attr("src");
                        if (imgUrl)
                            images.push(imgUrl);
                    });
                    if (images.length === 0) {
                        return m.reply(KOMIKU_NO_IMAGES_FOUND);
                    }
                    m.reply(KOMIKU_IMAGES_FOUND(images.length));
                    const tempDir = "tmp";
                    if (!fs.existsSync(tempDir))
                        fs.mkdirSync(tempDir);
                    for (let i = 0; i < images.length; i++) {
                        const imgUrl = images[i];
                        const filename = `image_${i + 1}.jpg`;
                        const filepath = join(tempDir, filename);
                        const imgResponse = await axios.get(imgUrl, { responseType: "arraybuffer" });
                        fs.writeFileSync(filepath, imgResponse.data);
                    }
                    const zipFilename = "komikudl.zip";
                    const output = fs.createWriteStream(zipFilename);
                    const archive = archiver("zip", { zlib: { level: 9 } });
                    output.on("close", async () => {
                        await m.react('✅');
                        await conn.sendFile(m.chat, zipFilename, zipFilename, KOMIKU_ZIP_READY, m);
                        setTimeout(() => {
                            fs.unlinkSync(zipFilename);
                            fs.rmSync(tempDir, { recursive: true, force: true });
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
                    console.error("Error:", error);
                    m.reply(KOMIKU_ERROR(error.message));
                }
            }
        }
    ];
}
export default KomikuDownloadPlugin;
//# sourceMappingURL=descargas-komiku.js.map