const handler = async (m, { conn, args }) => {
    if (args.length < 2) {
        conn.reply(m.chat, 'Debes proporcionar la hora (HH:MM) y el país (MX, CO, CL, AR).', m);
        return;
    }
    const horaRegex = /^([01]\d|2[0-3]):?([0-5]\d)$/;
    if (!horaRegex.test(args[0])) {
        conn.reply(m.chat, 'Formato de hora incorrecto. Debe ser HH:MM en formato de 24 horas.', m);
        return;
    }
    const horaUsuario = args[0];
    const pais = args[1].toUpperCase();
    const diferenciasHorarias = {
        MX: 0,
        CO: 1,
        CL: 2,
        AR: 3
    };
    if (!(pais in diferenciasHorarias)) {
        conn.reply(m.chat, 'País no válido. Usa MX para México, CO para Colombia, CL para Chile o AR para Argentina.', m);
        return;
    }
    const diferenciaHoraria = diferenciasHorarias[pais];
    const hora = parseInt(horaUsuario.split(':')[0], 10);
    const minutos = parseInt(horaUsuario.split(':')[1], 10);
    const horasEnPais = [];
    for (let i = 0; i < 4; i++) {
        const horaActual = new Date();
        horaActual.setHours(hora + i);
        horaActual.setMinutes(minutos);
        horaActual.setSeconds(0);
        horaActual.setMilliseconds(0);
        const horaEnPais = new Date(horaActual.getTime() - (3600000 * diferenciaHoraria));
        horasEnPais.push(horaEnPais);
    }
    const formatTime = (date) => date.toLocaleTimeString('es', { hour12: false, hour: '2-digit', minute: '2-digit' });
    const horaActual = formatTime(new Date());
    const message = `
╭──────⚔──────╮
           4 𝐕𝐄𝐑𝐒𝐔𝐒 4 
              *INTERNA*
╰──────⚔──────╯

🇲🇽 𝐌𝐄𝐗𝐈𝐂𝐎 : ${formatTime(horasEnPais[0])}
🇨🇴 𝐂𝐎𝐋𝐎𝐌𝐁𝐈𝐀 : ${formatTime(horasEnPais[1])}
🇨🇱 𝐂𝐇𝐈𝐋𝐄 : ${formatTime(horasEnPais[2])}
🇦🇷 𝐀𝐑𝐆𝐄𝐍𝐓𝐈𝐍𝐀 : ${formatTime(horasEnPais[3])}

𝐇𝐎𝐑𝐀 𝐀𝐂𝐓𝐔𝐀𝐋 𝐄𝐍 𝐌𝐄𝐗𝐈𝐂𝐎🇲🇽 : ${horaActual}

𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 1

👑 ┇ 
🥷🏻 ┇  
🥷🏻 ┇ 
🥷🏻 ┇ 

𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 2

👑 ┇ 
🥷🏻 ┇  
🥷🏻 ┇ 
🥷🏻 ┇ 

ㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄:
🥷🏻 ┇ 
🥷🏻 ┇
`.trim();
    conn.sendMessage(m.chat, { text: message }, { quoted: m });
};
handler.help = ['interna4'];
handler.tags = ['freefire'];
handler.command = /^(interno4|invs4|interna4)$/i;
export default handler;
//# sourceMappingURL=ff-internav4.js.map