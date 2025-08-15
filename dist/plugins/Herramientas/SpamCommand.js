import { Command } from '../../core/Command.js';
import { spamMessages } from '../../lib/herramientas-content.js';
const delay = time => new Promise(res => setTimeout(res, time));
function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100), seconds = Math.floor((duration / 1000) % 60), minutes = Math.floor((duration / (1000 * 60)) % 60), hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return hours + " Hora(s) " + minutes + " Minuto(s)";
}
class SpamCommand extends Command {
    #logger;
    constructor(logger) {
        super('spam', 'Envía mensajes de spam a un número de WhatsApp. Uso: !spam <numero>|<texto>|<cantidad>');
        this.#logger = logger;
        this.commands = ['spam', 'spamwa'];
        this.group = false;
        this.premium = false;
        this.register = true;
        this.level = 16;
        this.limit = 60;
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        let time = global.db.data.users[m.sender].lastrob + 7200000;
        if (new Date - global.db.data.users[m.sender].lastrob < 7200000) {
            await conn.reply(m.chat, spamMessages.cooldown(msToTime(time - new Date())), m);
            return;
        }
        let [nomor, pesan, jumlah] = text.split('|');
        if (!nomor) {
            await conn.reply(m.chat, spamMessages.noNumber(usedPrefix, command), m);
            return;
        }
        if (!pesan) {
            await conn.reply(m.chat, spamMessages.noMessage(usedPrefix, command), m);
            return;
        }
        if (jumlah && isNaN(jumlah)) {
            await conn.reply(m.chat, spamMessages.invalidAmount(usedPrefix, command), m);
            return;
        }
        let fixedNumber = nomor.replace(/[-+<>@]/g, '').replace(/ +/g, '').replace(/^[0]/g, '62') + '@s.whatsapp.net';
        let fixedJumlah = jumlah ? jumlah * 1 : 10;
        if (fixedJumlah > 10) {
            await conn.reply(m.chat, spamMessages.amountTooLow(10), m);
            return;
        }
        await conn.reply(m.chat, spamMessages.success(fixedJumlah, nomor), m);
        for (let i = fixedJumlah; i > 0; i--) {
            await delay(1000);
            await conn.reply(fixedNumber, pesan.trim(), m);
        }
        global.db.data.users[m.sender].lastrob = new Date * 1;
    }
}
export default SpamCommand;
//# sourceMappingURL=SpamCommand.js.map