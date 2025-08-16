// ai-blocklist.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras
/* Creado por https://github.com/FG98F */
const handler = async (m, { conn }) => {
    await conn.fetchBlocklist().then(async (data) => {
        let txt = `*≡ Lista de bloqueados*\n\n*Total :* ${data.length}\n\n┌─⊷\n`;
        for (const i of data) {
            txt += `▢ @${i.split('@')[0]}\n`;
        }
        txt += '└───────────';
        return conn.reply(m.chat, txt, m, { mentions: await conn.parseMention(txt) });
    }).catch((err) => {
        console.log(err);
        throw 'No hay números bloqueados';
    });
};
handler.help = ['blocklist'];
handler.tags = ['main'];
handler.command = ['blocklist', 'listblock'];
handler.rowner = true;
export default handler;
//# sourceMappingURL=ai-blocklist.js.map