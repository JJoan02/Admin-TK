let handler = async (m, { conn }) => {
    const user = global.db.data.users[m.sender];
    const now = new Date();
    if (!user.walletSweets)
        user.walletSweets = 0;
    if (!user.walletXP)
        user.walletXP = 0;
    if (user.lastCasa && now - user.lastCasa < 1000) {
        const timeLeft = Math.ceil((1000 - (now - user.lastCasa)) / 1000);
        return conn.reply(m.chat, `⏳ Debes esperar ${timeLeft} segundos antes de abrir la casa nuevamente.`, m);
    }
    user.lastCasa = now;
    const recompensaDulces = 20;
    const recompensaXP = 20;
    user.walletSweets += recompensaDulces;
    user.walletXP += recompensaXP;
    conn.reply(m.chat, `💥 ¡BOOM! Has abierto la casa y recibiste ${recompensaDulces} dulces y ${recompensaXP} XP! 💥 Ahora tienes un total de ${user.walletSweets} dulces y ${user.walletXP} XP en tu cartera. ¡Sigue así! 🎊`, m);
};
handler.help = ['abrircasa'];
handler.tags = ['economy'];
handler.command = ['abrircasa'];
export default handler;
//# sourceMappingURL=rpg-cofresema.js.map