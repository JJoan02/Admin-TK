let handler = async (m, { conn }) => {
    let users = global.db.data.users;
    users[m.sender].limit = Infinity;
    await m.reply('¡Ahora tienes *KI infinito*! 🎉');
};
handler.help = ['chetarki'];
handler.tags = ['rpg'];
handler.command = ['chetarki'];
handler.register = false;
handler.owner = true;
export default handler;
//# sourceMappingURL=rpg-chekarti.js.map