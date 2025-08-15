import { Command } from '../../core/Command.js';
import { botStatsMessages } from '../../lib/informacion-content.js';
import { clockString } from '../../utils/helpers.js';
import ws from 'ws';
class BotStatsCommand extends Command {
    constructor() {
        super('status', 'Muestra estadísticas del bot.');
        this.commands = ['estado', 'status', 'estate', 'state', 'stado', 'stats'];
    }
    async execute(context) {
        const { m, conn, usedPrefix } = context;
        let _muptime;
        if (process.send) {
            process.send('uptime');
            _muptime = await new Promise(resolve => {
                process.once('message', resolve);
                setTimeout(resolve, 1000);
            }) * 1000;
        }
        const muptime = clockString(_muptime);
        const totalreg = Object.keys(global.db.data.users).length;
        const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats);
        const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'));
        const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
        const totalUsers = users.length;
        const old = performance.now();
        const neww = performance.now();
        const speed = neww - old;
        let txt = botStatsMessages.header;
        txt += botStatsMessages.creator;
        txt += botStatsMessages.prefix(usedPrefix);
        txt += botStatsMessages.version(global.vs);
        txt += botStatsMessages.privateChats(chats.length - groupsIn.length);
        txt += botStatsMessages.totalChats(chats.length);
        txt += botStatsMessages.users(totalreg);
        txt += botStatsMessages.groups(groupsIn.length);
        txt += botStatsMessages.uptime(muptime);
        txt += botStatsMessages.speed((speed * 1000).toFixed(0) / 1000);
        txt += botStatsMessages.subBots(totalUsers || '0');
        await conn.sendFile(m.chat, 'https://files.catbox.moe/z8k11d.jpeg', 'image.jpg', txt, global.fkontak, null, global.fake);
    }
}
export default BotStatsCommand;
//# sourceMappingURL=BotStatsCommand.js.map