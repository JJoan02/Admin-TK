let handler = async (m, { conn, args }) => {
    let users = global.db.data.users;
    let user = users[m.sender];
    if (!args[0] || isNaN(args[0])) {
        return m.reply("⚠️ Por favor, indica la cantidad de caramelos que deseas canjear.");
    }
    let cantidadACanjear = parseInt(args[0]);
    if (user.caramelos < cantidadACanjear) {
        return m.reply(`🚫 No tienes suficientes caramelos. Tienes ${user.caramelos} caramelos.`);
    }
    let premio = "un descuento especial";
    user.caramelos -= cantidadACanjear;
    await m.reply(`✅ Has canjeado ${cantidadACanjear} caramelos y recibes ${premio}. Ahora tienes ${user.caramelos} caramelos.`);
};
handler.help = ['canjearcaramelos <cantidad>'];
handler.tags = ['economía'];
handler.command = ['canjearcaramelos'];
export default handler;
//# sourceMappingURL=rpg-caramelos.js.map