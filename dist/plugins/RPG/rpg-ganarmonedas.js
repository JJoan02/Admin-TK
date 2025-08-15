let handler = async (m, { conn }) => {
    let users = global.db.data.users;
    let user = users[m.sender];
    let today = new Date().toDateString();
    if (user.lastClaimedMonedas === today) {
        return m.reply("🚫 Ya has reclamado tus monedas hoy. Vuelve mañana para recibir más.");
    }
    let monedasGanadas = 15;
    user.monedas = (user.monedas || 0) + monedasGanadas;
    user.lastClaimedMonedas = today;
    await m.reply(`✅ Has ganado ${monedasGanadas} monedas. Ahora tienes ${user.monedas} monedas.`);
};
handler.help = ['ganarmonedas'];
handler.tags = ['economía'];
handler.command = ['ganarmonedas'];
export default handler;
//# sourceMappingURL=rpg-ganarmonedas.js.map