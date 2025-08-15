import db from '../lib/database.js';
let handler = async (m, { conn }) => {
    let users = global.db.data.users;
    let user = users[m.sender];
    if (!user) {
        user = {
            experience: 0
        };
        users[m.sender] = user;
    }
    let experienciaGanada = 100;
    user.experience += experienciaGanada;
    await m.reply(`🎉 Has ganado *${experienciaGanada}* puntos de experiencia! Ahora tienes *${user.experience}* puntos de experiencia.`);
};
handler.help = ['claim2'];
handler.tags = ['rpg'];
handler.command = ['claim2'];
export default handler;
//# sourceMappingURL=rpg-claim.js.map