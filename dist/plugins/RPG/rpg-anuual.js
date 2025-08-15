const annualReward = {
    coin: 1000,
    exp: 5000,
    diamond: 50,
};
const oneYearMs = 31536000000;
var handler = async (m, { conn, text }) => {
    let user = global.db.data.users[m.sender];
    if (!user) {
        user = global.db.data.users[m.sender] = {
            coin: 0,
            diamond: 0,
            exp: 0,
            lastAnnualClaim: 0,
        };
    }
    const lastClaim = user.lastAnnualClaim || 0;
    const currentTime = Date.now();
    if (currentTime - lastClaim < oneYearMs) {
        const remainingTime = msToTime(oneYearMs - (currentTime - lastClaim));
        return conn.reply(m.chat, `🕚 *Ya has reclamado tu recompensa anual. Vuelve en ${remainingTime}*`, m);
    }
    user.coin += annualReward.coin;
    user.diamond += annualReward.diamond;
    user.exp += annualReward.exp;
    user.lastAnnualClaim = currentTime;
    const moneda = global.moneda ?? 'Moneda';
    conn.reply(m.chat, `🎉 *Recompensa Anual Reclamada* \nRecursos: \n💸 ${moneda}: <em>+${annualReward.coin}</em> \n💎 Diamantes: <em>+${annualReward.diamond}</em> \n✨ XP: <em>+${annualReward.exp}</em>`, m);
};
handler.help = ['annual', 'yearly'];
handler.tags = ['rpg'];
handler.command = ['annual', 'yearly'];
handler.register = false;
export default handler;
function msToTime(duration) {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const days = Math.floor(duration / (1000 * 60 * 60 * 24));
    return `${days} Día${days !== 1 ? 's' : ''}, ${hours} Hora${hours !== 1 ? 's' : ''}, ${minutes} Minuto${minutes !== 1 ? 's' : ''}, ${seconds} Segundo${seconds !== 1 ? 's' : ''}`;
}
//# sourceMappingURL=rpg-anuual.js.map