let handler = async (m) => {
    let user = global.db.data.users[m.sender];
    await m.reply(`${user.nombre}, ¡has comenzado a excavar! ⛏️`);
    user.dulces += 100;
    await m.reply(`🎉 ¡Felicidades! Has encontrado *100 dulces* al excavar.`);
};
handler.help = ['excavar'];
handler.tags = ['mascota'];
handler.command = ['dig', 'excavar'];
handler.register = false;
export default handler;
//# sourceMappingURL=rpg-excavar.js.map