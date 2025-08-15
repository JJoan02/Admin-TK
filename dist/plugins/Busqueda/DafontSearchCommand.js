import { ICommand, IPluginModule } from '../../types/plugin';
import axios from 'axios';
import * as cheerio from "cheerio";
import * as fs from "fs/promises";
import * as path from "path";
import { DAFONT_DESCRIPTION, DAFONT_USAGE_ERROR, DAFONT_NO_QUERY, DAFONT_SEARCH_RESULTS, DAFONT_ERROR_SEARCH, DAFONT_INVALID_URL, DAFONT_URL_INACCESSIBLE, DAFONT_ERROR_DOWNLOAD, DAFONT_NO_FONTS_FOUND, DAFONT_NO_DOWNLOAD_LINK, DAFONT_ERROR_GET_DOWNLOAD_URL, DAFONT_ZIP_FAILED, DAFONT_ERROR_DOWNLOAD_FONT, DAFONT_FONT_SENT, DAFONT_ERROR_SEND_FONT } from '../../content/busqueda/dafont-responses';
const HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:117.0) Gecko/20100101 Firefox/117.0",
    "Accept-Language": "es-ES,es;q=0.9",
    "Referer": "https://www.dafont.com/"
};
class DafontSearchPlugin {
    name = "DafontSearchPlugin";
    commands = [
        {
            name: "dafont",
            alias: ["dafontsearch", "dafontdl"],
            desc: DAFONT_DESCRIPTION,
            category: "Busqueda",
            react: "✒️",
            execute: async (Yaka, m, { conn, text, usedPrefix, command, args }) => {
                const action = args[0]?.toLowerCase();
                const query = args.slice(1).join(' ').trim();
                if (action === 'download' && query) {
                    await DafontSearchPlugin.handleDownload(m, conn, query);
                }
                else if (action === 'search' || !action) {
                    await DafontSearchPlugin.handleSearch(m, conn, text.trim());
                }
                else {
                    await conn.reply(m.chat, DAFONT_USAGE_ERROR(usedPrefix), m);
                }
            }
        }
    ];
    static async handleSearch(m, conn, query) {
        if (!query) {
            await conn.reply(m.chat, DAFONT_NO_QUERY, m);
            return;
        }
        try {
            await m.react('🕒');
            const searchResults = await DafontSearchPlugin.buscarFuentes(query);
            const formattedResults = searchResults
                .map((url, index) => `${index + 1}. ${url}`)
                .join("\n");
            await conn.sendMessage(m.chat, {
                text: DAFONT_SEARCH_RESULTS(query, formattedResults),
            });
            await m.react('✅');
        }
        catch (error) {
            console.error(`${DAFONT_ERROR_SEARCH} ${error.message}`);
            await conn.reply(m.chat, error.message, m);
            await m.react('✖️');
        }
    }
    static async handleDownload(m, conn, urlFuente) {
        try {
            await m.react('🕒');
            if (!urlFuente || !urlFuente.startsWith("https://www.dafont.com")) {
                return m.reply(DAFONT_INVALID_URL);
            }
            const urlDescarga = await DafontSearchPlugin.obtenerUrlDescarga(urlFuente);
            const respuesta = await axios.head(urlDescarga);
            if (respuesta.status !== 200) {
                throw new Error(DAFONT_URL_INACCESSIBLE);
            }
            const rutaZip = await DafontSearchPlugin.descargarFuente(urlDescarga);
            await DafontSearchPlugin.enviarFuenteAlUsuario(rutaZip, conn, m);
        }
        catch (error) {
            console.error(`${DAFONT_ERROR_DOWNLOAD} ${error.message}`);
            m.reply(error.message);
            await m.react('✖️');
        }
    }
    static async buscarFuentes(consulta) {
        try {
            const urlBusqueda = `https://www.dafont.com/search.php?q=${encodeURIComponent(consulta)}`;
            const { data } = await axios.get(urlBusqueda, { headers: HEADERS });
            const $ = cheerio.load(data);
            const resultados = [];
            $("div.preview a").each((_, el) => {
                const urlRelativa = $(el).attr("href");
                if (urlRelativa) {
                    const urlCompleta = `https://www.dafont.com/${urlRelativa}`;
                    resultados.push(urlCompleta);
                }
            });
            if (resultados.length === 0) {
                throw new Error(DAFONT_NO_FONTS_FOUND);
            }
            return resultados.slice(0, 5);
        }
        catch (error) {
            console.error(`Error en #buscarFuentes: ${error.message}`);
            throw new Error(DAFONT_ERROR_SEARCH);
        }
    }
    static async obtenerUrlDescarga(urlFuente) {
        try {
            const { data } = await axios.get(urlFuente, { headers: HEADERS });
            const $ = cheerio.load(data);
            const enlaceDescarga = $("a.dl").attr("href");
            if (!enlaceDescarga) {
                throw new Error(DAFONT_NO_DOWNLOAD_LINK);
            }
            const urlCompletaDescarga = enlaceDescarga.startsWith('//') ? `https:${enlaceDescarga}` : enlaceDescarga;
            return urlCompletaDescarga;
        }
        catch (error) {
            console.error(`${DAFONT_ERROR_GET_DOWNLOAD_URL} ${error.message}`);
            throw new Error(DAFONT_ERROR_GET_DOWNLOAD_URL);
        }
    }
    static async descargarFuente(urlZip) {
        try {
            const respuesta = await axios.get(urlZip, {
                responseType: "arraybuffer",
                headers: HEADERS
            });
            const tipoContenido = respuesta.headers["content-type"];
            if (!tipoContenido || !tipoContenido.includes("application/zip")) {
                throw new Error(DAFONT_ZIP_FAILED);
            }
            const rutaArchivo = path.resolve(process.cwd(), "fuente.zip");
            await fs.writeFile(rutaArchivo, Buffer.from(respuesta.data));
            return rutaArchivo;
        }
        catch (error) {
            console.error(`${DAFONT_ERROR_DOWNLOAD_FONT} ${error.message}`);
            throw new Error(DAFONT_ERROR_DOWNLOAD_FONT);
        }
    }
    static async enviarFuenteAlUsuario(rutaArchivo, conn, m) {
        try {
            const bufferImagen = await fs.readFile(rutaArchivo);
            await m.react('✅');
            await conn.sendMessage(m.chat, {
                document: bufferImagen,
                fileName: "fuente.zip",
                mimetype: "application/zip",
                caption: DAFONT_FONT_SENT,
                quoted: m
            });
            await fs.unlink(rutaArchivo);
        }
        catch (error) {
            console.error(`${DAFONT_ERROR_SEND_FONT} ${error.message}`);
            throw new Error(DAFONT_ERROR_SEND_FONT);
        }
    }
}
export default DafontSearchPlugin;
//# sourceMappingURL=DafontSearchCommand.js.map