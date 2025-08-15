import { Command } from '../../core/Command.js';
import { generateWAMessageFromContent } from "@whiskeysockets/baileys";
import { cpus as _cpus, totalmem, freemem } from 'os';
import { performance } from 'perf_hooks';
import { sizeFormatter } from 'human-readable';
import { clockString } from '../../utils/helpers.js';
import { botInfoMessages } from '../../lib/informacion-content.js';
const format = sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
});
class BotInfoCommand extends Command {
    constructor() {
        super('infobot', 'Muestra información detallada del bot.');
        this.commands = ['info', 'infobot', 'botinfo'];
    }
    async execute(context) {
        const { m, conn } = context;
        const _uptime = process.uptime() * 1000;
        const uptime = clockString(_uptime);
        const totalreg = Object.keys(global.db.data.users).length;
        const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats);
        const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'));
        const used = process.memoryUsage();
        const cpus = _cpus().map(cpu => {
            cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0);
            return cpu;
        });
        const cpu = cpus.reduce((last, cpu, _, { length }) => {
            last.total += cpu.total;
            last.speed += cpu.speed / length;
            last.times.user += cpu.times.user;
            last.times.nice += cpu.times.nice;
            last.times.sys += cpu.times.sys;
            last.times.idle += cpu.times.idle;
            last.times.irq += cpu.times.irq;
            return last;
        }, {
            speed: 0,
            total: 0,
            times: {
                user: 0,
                nice: 0,
                sys: 0,
                idle: 0,
                irq: 0
            }
        });
        const old = performance.now();
        const neww = performance.now();
        const speed = neww - old;
        let infobt = botInfoMessages.header;
        infobt += botInfoMessages.groupChats(groupsIn.length);
        infobt += botInfoMessages.joinedGroups(groupsIn.length);
        infobt += botInfoMessages.abandonedGroups(groupsIn.length - groupsIn.length);
        infobt += botInfoMessages.privateChats(chats.length - groupsIn.length);
        infobt += botInfoMessages.totalChats(chats.length);
        infobt += botInfoMessages.registeredUsers(totalreg);
        infobt += botInfoMessages.uptime(uptime);
        infobt += botInfoMessages.memoryUsage(used);
        const prep = generateWAMessageFromContent(m.chat, { "orderMessage": { "orderId": "6288215463787", "itemCount": 2022, "message": infobt, "orderTitle": global.packname, "footerText": "Yaemori Bot - MD", "token": "AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA==", "thumbnail": global.imagen1, "surface": "CATALOG" } }, { quoted: global.fkontak });
        await conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id });
    }
}
export default BotInfoCommand;
//# sourceMappingURL=BotInfoCommand.js.map