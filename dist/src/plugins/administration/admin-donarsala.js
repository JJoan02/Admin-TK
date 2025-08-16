// admin-donarsala.ts - Plugin mejorado y optimizado
// Categoría: administration
// Funcionalidad: Administración de grupos y moderación
// Convertido automáticamente a TypeScript con mejoras
let toM = a => '@' + a.split('@')[0];
function handler(m, { groupMetadata }) {
    let ps = groupMetadata.participants.map(v => v.id);
    let a = ps.getRandom();
    let b;
    do
        b = ps.getRandom();
    while (b === a);
    m.reply(`*${toM(a)},* _Busca la salita bebe que ya viene el vs_ 📌
sᥲsᥙkᥱ ᑲ᥆𝗍 🤖`, null, {
        mentions: [a, b]
    });
}
handler.help = ['donarsala'];
handler.tags = ['freefire'];
handler.command = ['donarsala', 'sala'];
handler.group = true;
export default handler;
//# sourceMappingURL=admin-donarsala.js.map