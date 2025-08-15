import { tmpdir } from 'os';
import path, { join } from 'path';
import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch } from 'fs';
let handler = async (m, { conn, usedPrefix: _p, __dirname, args, text }) => {
    let ar = Object.keys(plugins);
    let ar1 = ar.map(v => v.replace('.js', ''));
    if (!text)
        throw `📌 *_Ejemplo de uso:_*\n*#deleteplugin menu-menu*`;
    if (!ar1.includes(args[0]))
        return m.reply(`*🗃️ NO ENCONTRADO!*\n•••••••••••••••••••••••••••••••••••••••••••••••••••••••\n\n${ar1.map(v => ' ' + v).join `\n`}`);
    const file = join(__dirname, '../plugins/' + args[0] + '.js');
    unlinkSync(file);
    conn.reply(m.chat, `⚠️ *_El plugin "plugins/${args[0]}.js" se ha eliminado con éxito._*`, m);
};
handler.help = ['deleteplugin'];
handler.tags = ['owner'];
handler.command = /^(deleteplugin|dp|deleteplu)$/i;
handler.rowner = true;
handler.private = true;
export default handler;
//# sourceMappingURL=owner-deleteFile.js.map