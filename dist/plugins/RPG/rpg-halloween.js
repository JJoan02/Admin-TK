const baseCoinReward = 100000;
var handler = async (m, { conn }) => {
    if (!m.isGroup)
        return m.reply("❌ Este comando solo puede usarse en grupos.");
    let user = global.db.data.users[m.sender] || {};
    user.halloween = user.halloween || 0;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const isOctober = currentDate.getMonth() === 9;
    const cooldown = 365 * 24 * 60 * 60 * 1000;
    let timeRemaining = user.halloween + cooldown - currentDate.getTime();
    if (!isOctober) {
        return m.reply(`🎃 ¡Solo puedes reclamar tu regalo de Halloween en octubre! Vuelve en octubre de ${currentYear}.`);
    }
    if (timeRemaining > 0) {
        return m.reply(`⏱️ ¡Ya reclamaste tu regalo de Halloween este año! Vuelve en:\n *${msToTime(timeRemaining)}*`);
    }
    let coinReward = pickRandom([20000, 30000, 40000, baseCoinReward]);
    let candyReward = pickRandom([5, 10, 15, 20]);
    let expReward = pickRandom([2000, 3000, 4000, 5000]);
    let giftReward = pickRandom([2, 3, 4, 5]);
    user.coin = (user.coin || 0) + coinReward;
    user.candies = (user.candies || 0) + candyReward;
    user.exp = (user.exp || 0) + expReward;
    user.gifts = (user.gifts || 0) + giftReward;
    m.reply(`
\`\`\`🎃 ¡Feliz Halloween! ¡Disfruta de tu regalo de Halloween! 👻\`\`\`

🪙 *Coins* : +${coinReward.toLocaleString()}
🍬 *Dulces* : +${candyReward}
✨ *Experiencia* : +${expReward}
🎃 *Regalos de Halloween* : +${giftReward}`);
    user.halloween = new Date().getTime();
};
handler.help = ['halloween'];
handler.tags = ['rpg'];
handler.command = ['halloween'];
export default handler;
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}
function msToTime(duration) {
    var days = Math.floor(duration / (1000 * 60 * 60 * 24));
    var hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${days} días ${hours} horas ${minutes} minutos`;
}
//# sourceMappingURL=rpg-halloween.js.map