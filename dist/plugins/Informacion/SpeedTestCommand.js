import { Command } from '../../core/Command.js';
import { totalmem, freemem } from 'os';
import { performance } from 'perf_hooks';
import { sizeFormatter } from 'human-readable';
import speed from 'performance-now';
import { clockString, formatBytes } from '../../utils/helpers.js';
import { speedTestMessages } from '../../lib/informacion-content.js';
const format = sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
});
class SpeedTestCommand extends Command {
    constructor() {
        super('speed', 'Mide la velocidad del bot y muestra estadísticas.');
        this.commands = ['speed'];
    }
    async execute(context) {
        const timestamp = speed();
        const latensi = speed() - timestamp;
        const _muptime = process.uptime() * 1000;
        const muptime = clockString(_muptime);
        const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats);
        const groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0]);
        let texto = speedTestMessages.header(global.botname);
        texto += speedTestMessages.speed(latensi);
        texto += speedTestMessages.uptime(muptime);
        texto += speedTestMessages.chats(chats.length - groups.length, groups.length);
        texto += speedTestMessages.serverRam(format(totalmem() - freemem()), format(totalmem()));
        m.react('✈️');
        await conn.reply(m.chat, texto, m, global.rcanal);
    }
}
export default SpeedTestCommand;
//# sourceMappingURL=SpeedTestCommand.js.map