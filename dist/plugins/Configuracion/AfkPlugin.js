class AfkPlugin {
    #dbService;
    #logger;
    constructor(dbService, logger) {
        this.#dbService = dbService;
        this.#logger = logger;
    }
    async before(m, { conn }) {
        const user = await this.#dbService.getUser(m.sender);
        if (!user)
            return true;
        if (user.afk && user.afk > -1) {
            const afkDuration = new Date().getTime() - user.afk;
            const afkReason = user.afkReason ? `Motivo De La Inactividad: ${user.afkReason}` : '';
            await conn.reply(m.chat, `🚩 Dejaste De Estar Inactivo\n${afkReason}\n\n*Tiempo Inactivo: ${this.#toTimeString(afkDuration)}*`, m);
            await this.#dbService.updateUser(m.sender, { afk: -1, afkReason: '' });
        }
        const jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];
        for (const jid of jids) {
            const mentionedUser = await this.#dbService.getUser(jid);
            if (!mentionedUser)
                continue;
            const afkTime = mentionedUser.afk;
            if (afkTime && afkTime > -1) {
                const reason = mentionedUser.afkReason || '';
                const afkDuration = new Date().getTime() - afkTime;
                await conn.reply(m.chat, `🚩 *El Usuario @${jid.split('@')[0]} Esta Inactivo No Lo Etiquetes*\n${reason ? `Motivo: ${reason}` : ''}\n*Tiempo Inactivo: ${this.#toTimeString(afkDuration)}*`, m, { mentions: [jid] });
            }
        }
        return true;
    }
    #toTimeString(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const s = seconds % 60;
        const min = minutes % 60;
        const h = hours % 24;
        let timeString = '';
        if (days > 0)
            timeString += `${days}d `;
        if (h > 0)
            timeString += `${h}h `;
        if (min > 0)
            timeString += `${min}m `;
        timeString += `${s}s`;
        return timeString.trim();
    }
}
export default AfkPlugin;
//# sourceMappingURL=AfkPlugin.js.map