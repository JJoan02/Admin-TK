import fs from 'fs';
let mg = '⚠️ ERROR: Falta el texto del plugin';
let handler = async (m, { usedPrefix, command, text }) => {
    let ar = Object.keys(plugins);
    let ar1 = ar.map(v => v.replace('.js', ''));
    if (!text)
        throw `*${mg}\nINGRESA EL TEXTO DEL PLUGIN\nejemplo:\n${usedPrefix + command} menu`;
    if (!ar1.includes(text))
        return m.reply(`'${text}' tidak ditemukan!\n\n${ar1.map(v => ' ' + v).join `\n`}`);
    m.reply(fs.readFileSync('./plugins/' + text + '.js', 'utf-8'));
};
handler.help = ['getplugin'].map(v => v + ' <teks>');
handler.command = /^(get|getplungis)$/i;
handler.rowner = true;
export default handler;
//# sourceMappingURL=_get.js.map