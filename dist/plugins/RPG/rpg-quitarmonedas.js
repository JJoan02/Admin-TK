let handler = async (m, { conn, args }) => {
    let users = global.db.data.users;
    let user = users[m.sender];
    if (!args[0] || isNaN(args[0]) || args[0] <= 0) {
        return m.reply("⚠️ Por favor, indica la cantidad de monedas que deseas quitar.");
    }
    let cantidadAQuitar = parseInt(args[0]);
    if (user.monedas < cantidadAQuitar) {
        return m.reply(`🚫 No tienes suficientes monedas. Tienes ${user.monedas} monedas.`);
    }
    user.monedas -= cantidadAQuitar;
    await m.reply(`✅ Has quitado ${cantidadAQuitar} monedas. Ahora tienes ${user.monedas} monedas.`);
};
handler.help = ['quitarmonedas <cantidad>'];
handler.tags = ['economía'];
handler.command = ['quitarmonedas'];
export default handler;
//# sourceMappingURL=rpg-quitarmonedas.js.map