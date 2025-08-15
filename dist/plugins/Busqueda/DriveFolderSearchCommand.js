import { ICommand, IPluginModule } from '../../types/plugin';
import fetch from 'node-fetch';
import { DRIVE_FOLDER_NO_URL, DRIVE_FOLDER_INVALID_URL, DRIVE_FOLDER_NOT_FOUND, DRIVE_FOLDER_SENDING_LINKS, DRIVE_FOLDER_ERROR_SEARCH, DRIVE_FOLDER_ERROR_GENERIC } from '../../content/busqueda/drive-folder-responses';
class DriveFolderSearchPlugin {
    name = "DriveFolderSearchPlugin";
    commands = [
        {
            name: "drivefolder",
            alias: [],
            desc: "Busca archivos y carpetas en una URL de Google Drive.",
            category: "Busqueda",
            react: "📁",
            execute: async (Yaka, m, { conn, args }) => {
                if (!args[0]) {
                    return conn.reply(m.chat, DRIVE_FOLDER_NO_URL(global.lenguajeTK.smsAvisoMG()), m);
                }
                let url = args[0];
                if (!(url && url.match(/drive\.google/i))) {
                    return conn.reply(m.chat, DRIVE_FOLDER_INVALID_URL(global.lenguajeTK.smsAvisoMG()), m);
                }
                url = url.replace('/mobile', '');
                try {
                    const extractedData = await DriveFolderSearchPlugin.getData(url);
                    if (extractedData.length === 0) {
                        await conn.reply(m.chat, DRIVE_FOLDER_NOT_FOUND, m);
                        return;
                    }
                    const responseText = DRIVE_FOLDER_SENDING_LINKS + '\n\n' + extractedData.join('\n\n');
                    await conn.reply(m.chat, responseText, m);
                    await m.react('✅');
                }
                catch (e) {
                    console.error(`${DRIVE_FOLDER_ERROR_SEARCH} ${e.message}`);
                    await conn.reply(m.chat, DRIVE_FOLDER_ERROR_GENERIC, m);
                    await m.react('✖️');
                }
            }
        }
    ];
    static async getData(folderUrl) {
        const res = await fetch(folderUrl);
        const text = await res.text();
        const archivos = text.match(/https:\/\/drive.google.com\/file\/d\/([^\s\\]+)usp\b/g);
        const folders = text.match(/https:\/\/drive.google.com\/drive\/folders\/([^\s"|\\|&|?|%]+)/g);
        const regexNombres = /(?<=\\x22\\x5d,\\x22)(.*?)(?=\\x22)/g;
        const nombres = text.match(regexNombres);
        const uniqueFolders = DriveFolderSearchPlugin.eliminarDuplicados(folders || []);
        const uniqueArchivos = DriveFolderSearchPlugin.eliminarDuplicados(archivos || []);
        if (uniqueFolders.length > 0)
            uniqueFolders.shift();
        const combined = uniqueFolders.concat(uniqueArchivos);
        const resultado = [];
        let index = 0;
        if (nombres) {
            while (nombres.length > 0 && index < combined.length) {
                const elemento = nombres.shift();
                resultado.push(`${elemento} ${combined[index]}`);
                index++;
            }
        }
        return resultado;
    }
    static eliminarDuplicados(lista) {
        return Array.from(new Set(lista));
    }
}
export default DriveFolderSearchPlugin;
//# sourceMappingURL=DriveFolderSearchCommand.js.map