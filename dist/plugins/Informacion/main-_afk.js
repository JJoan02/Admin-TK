export function before(m) {
    const user = global.db.data.users[m.sender];
    if (user.afk > -1) {
        conn.reply(m.chat, `🚩 Dejastes De Estar Inactivo\n${user.afkReason ? 'Motivo De La Inactividad: ' + user.afkReason : ''}\n\n*Tiempo Inactivo: ${(new Date - user.afk).toTimeString()}*`, m, rcanal);
        user.afk = -1;
        user.afkReason = '';
    }
}
//# sourceMappingURL=main-_afk.js.map