import { tmpdir } from 'os';
import path, { join } from 'path';
import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch } from 'fs';
let handler = async (m, { conn, usedPrefix: _p, __dirname, args }) => {
    conn.reply(m.chat, `🚩 Realizado, ya se ha eliminado los archivos de la carpeta tmp`, m, rcanal);
    const tmp = [tmpdir(), join(__dirname, '../megumin/tmp')];
    const filename = [];
    tmp.forEach(dirname => readdirSync(dirname).forEach(file => filename.push(join(dirname, file))));
    return filename.map(file => {
        const stats = statSync(file);
        unlinkSync(file);
    });
};
handler.help = ['cleartmp'];
handler.tags = ['owner'];
handler.command = ['cleartmp', 'borrartmp', 'borrarcarpetatmp', 'vaciartmp'];
handler.exp = 500;
handler.rowner = true;
export default handler;
//# sourceMappingURL=owner-cleartmp.js.map