let handler = async (m, { conn }) => {
    const rewardCandies = 1000;
    const rewardXP = 1000;
    let user = global.db.data.users[m.sender];
    if (!user.hasClaimedMasc) {
        user.limit += rewardCandies;
        user.exp += rewardXP;
        user.hasClaimedMasc = true;
        await m.reply(`🎉 ¡Has usado el comando *!masc*! Has recibido *${rewardCandies}* 🍬 Dulces y *${rewardXP} XP*! Ahora tienes un total de *${user.limit}* 🍬 y *${user.exp} XP*. ¡Disfrútalos! 🎊`);
    }
    else {
        await m.reply(`😟 Ya has utilizado el comando *!masc* anteriormente. No puedes reclamar más recompensas. 🛑`);
    }
};
handler.help = ['masc'];
handler.tags = ['rpg'];
handler.command = ['masc'];
handler.register = false;
export default handler;
//# sourceMappingURL=rpg-masc.js.map