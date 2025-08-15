const we = 15000;
let cooldown = 604800000 * 4;
let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.chat][m.sender];
    if (new Date - user.monthly < cooldown)
        throw `⏱️ ¡Ya reclamaste tu regalo mensual! Vuelve en:\n *${msToTime((user.monthly + cooldown) - new Date())}*`;
    user.exp += we;
    m.reply(`
\`\`\`🎁 ¿Ya ha pasado un mes? El tiempo se pasa volando. ¡Disfruta tu regalo mensual! 🐢\`\`\`

🍄 Experiencia : +${we.toLocaleString()}`);
    user.monthly = new Date * 1;
};
handler.help = ['monthly'];
handler.tags = ['economy'];
handler.command = ['mensual', 'monthly'];
export default handler;
function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100), seconds = Math.floor((duration / 1000) % 60), minutes = Math.floor((duration / (1000 * 60)) % 60), hours = Math.floor((duration / (1000 * 60 * 60)) % 24), days = Math.floor((duration / (1000 * 60 * 60 * 24)) % 365);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    days = (days > 0) ? days : 0;
    return days + ` d ` + hours + ` h ` + minutes + ` m`;
}
//# sourceMappingURL=econ-monthly.js.map