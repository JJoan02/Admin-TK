import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import unzipper from 'unzipper';
let handler = async (m, { conn, text }) => {
    const packName = text.replace(/^(getpack)\s+/i, '').trim();
    if (!packName) {
        conn.reply(m.chat, 'Por favor, proporciona el nombre del paquete que deseas instalar.', m);
        return;
    }
    try {
        const storeUrl = 'https://raw.githubusercontent.com/Elpapiema/CharHub-Store/refs/heads/main/plugin_Store/store.json';
        conn.reply(m.chat, `🔄 Buscando el paquete "${packName}" en la tienda...`, m);
        const response = await fetch(storeUrl);
        if (!response.ok)
            throw new Error(`Error al obtener la tienda: ${response.statusText}`);
        const storeData = await response.json();
        const pack = storeData.packages.find(p => p.name.toLowerCase() === packName.toLowerCase());
        if (!pack) {
            conn.reply(m.chat, `⚠️ El paquete "${packName}" no se encuentra en la tienda.`, m);
            return;
        }
        conn.reply(m.chat, `🔄 Descargando el paquete "${packName}"...`, m);
        const packFile = await fetch(pack.link);
        if (!packFile.ok)
            throw new Error(`Error al descargar el paquete: ${packFile.statusText}`);
        const buffer = await packFile.buffer();
        const rootPath = path.resolve();
        const pluginsFolder = path.join(rootPath, 'plugins');
        const tempZipPath = path.join(rootPath, `${packName}.zip`);
        fs.writeFileSync(tempZipPath, buffer);
        fs.createReadStream(tempZipPath)
            .pipe(unzipper.Extract({ path: pluginsFolder }))
            .on('close', () => {
            fs.unlinkSync(tempZipPath);
            conn.reply(m.chat, `✅ El paquete "${packName}" se ha instalado correctamente.`, m);
        })
            .on('error', (err) => {
            console.error('Error al descomprimir el paquete:', err.message);
            conn.reply(m.chat, `⚠️ Hubo un error al descomprimir el paquete: ${err.message}`, m);
        });
    }
    catch (err) {
        console.error('Error en getpack:', err.message);
        conn.reply(m.chat, `⚠️ Hubo un error: ${err.message}`, m);
    }
};
handler.command = /^(getpack)$/i;
export default handler;
//# sourceMappingURL=getpack.js.map