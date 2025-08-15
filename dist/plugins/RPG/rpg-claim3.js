let handler = async (m, { conn }) => {
    const rewardAmount = 400;
    let user = global.db.data.users[m.sender];
    user.limit += rewardAmount;
    await m.reply(`🎉 ¡Has reclamado *${rewardAmount}* 🍬 Dulces! Ahora tienes un total de *${user.limit}* 🍬. ¡Disfrútalos y sigue jugando! 🎊`);
};
handler.help = ['claim3'];
handler.tags = ['rpg'];
handler.command = ['claim3'];
handler.register = false;
export default handler;
//# sourceMappingURL=rpg-claim3.js.map