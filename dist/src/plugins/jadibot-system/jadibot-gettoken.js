// jadibot-gettoken.ts - Plugin mejorado y optimizado
// Categoría: jadibot-system
// Funcionalidad: Sistema de sub-bots
// Convertido automáticamente a TypeScript con mejoras
const handler = async (m, { conn }) => {
    const token = generateToken(8);
    m.reply(`🔑 Token generado: *${token}*`);
};
handler.command = ['gettoken'];
handler.rowner = true; // Solo los owners pueden usar este comando
function generateToken(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}
export default handler;
//# sourceMappingURL=jadibot-gettoken.js.map