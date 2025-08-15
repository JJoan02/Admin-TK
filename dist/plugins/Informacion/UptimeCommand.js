import { Command } from '../../core/Command.js';
import { uptimeMessages } from '../../lib/informacion-content.js';
import { clockString } from '../../utils/helpers.js';
class UptimeCommand extends Command {
    constructor() {
        super('uptime', 'Muestra el tiempo de actividad del bot.');
        this.commands = ['uptime', 'runtime'];
    }
    async execute(context) {
        const { m, conn } = context;
        const uptimeSeconds = process.uptime();
        const formattedUptime = clockString(uptimeSeconds * 1000);
        const runtimeText = uptimeMessages.header(global.packname) + uptimeMessages.uptime(formattedUptime);
        await conn.reply(m.chat, runtimeText, m, { contextInfo: { externalAdReply: { mediaUrl: false, mediaType: 1, description: false, title: global.packname, body: global.dev, previewType: 0, thumbnail: global.icons, sourceUrl: global.channel } } });
    }
}
export default UptimeCommand;
//# sourceMappingURL=UptimeCommand.js.map