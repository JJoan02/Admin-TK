import { Command } from '../../core/Command.js';
import cp from 'child_process';
import { promisify } from 'util';
import { speedTestMessages } from '../../lib/informacion-content.js';
const exec = promisify(cp.exec).bind(cp);
class NetworkSpeedTestCommand extends Command {
    #logger;
    constructor(logger) {
        super('speedtest', 'Realiza una prueba de velocidad de red.');
        this.#logger = logger;
        this.commands = ['speedtest'];
    }
    async execute(context) {
        const { m, conn } = context;
        try {
            await conn.reply(m.chat, speedTestMessages.header, m, {
                contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, showAdAttribution: true,
                        title: global.packname,
                        body: global.dev,
                        previewType: 0, thumbnail: global.icons,
                        sourceUrl: global.channel } }
            });
        }
        finally { }
        ;
        const { stdout, stderr } = await exec('python3 ./lib/ookla-speedtest.py --secure --share');
        if (stdout.trim()) {
            const match = stdout.match(/http[^"]+\.png/);
            const urlImagen = match ? match[0] : null;
            await conn.sendMessage(m.chat, { image: { url: urlImagen }, caption: stdout.trim() }, { quoted: global.fkontak });
        }
        if (stderr.trim()) {
            const match2 = stderr.match(/http[^"]+\.png/);
            const urlImagen2 = match2 ? match2[0] : null;
            await conn.sendMessage(m.chat, { image: { url: urlImagen2 }, caption: stderr.trim() }, { quoted: global.fkontak });
        }
    }
    catch(e) {
        this.#logger.error(`Error in NetworkSpeedTestCommand: ${e.message}`);
        await conn.reply(m.chat, speedTestMessages.error, m);
    }
}
export default NetworkSpeedTestCommand;
//# sourceMappingURL=NetworkSpeedTestCommand.js.map