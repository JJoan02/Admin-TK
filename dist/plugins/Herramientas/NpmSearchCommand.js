import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
import { npmSearchMessages } from '../../lib/internet-content.js';
class NpmSearchCommand extends Command {
    #logger;
    constructor(logger) {
        super('npmjs', 'Busca paquetes en npm.');
        this.#logger = logger;
        this.commands = ['npmjs'];
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        if (!text) {
            await conn.reply(m.chat, npmSearchMessages.noText(usedPrefix, command), m, global.rcanal);
            return;
        }
        try {
            await m.react(global.rwait);
            await conn.reply(m.chat, npmSearchMessages.processing, m, {
                contextInfo: {
                    externalAdReply: {
                        mediaUrl: null,
                        mediaType: 1,
                        showAdAttribution: true,
                        title: global.packname,
                        body: global.dev,
                        previewType: 0,
                        thumbnail: global.icons,
                        sourceUrl: global.channel
                    }
                }
            });
            const res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`);
            const { objects } = await res.json();
            if (!objects.length) {
                await conn.reply(m.chat, npmSearchMessages.noResult(text), m, global.fake);
                return;
            }
            let txt = objects.map(({ package: pkg }) => {
                return npmSearchMessages.resultItem(pkg.name, pkg.version, pkg.links.npm, pkg.description);
            }).join(', ');, await conn.reply(m.chat, npmSearchMessages.resultHeader + txt, m, global.fake));
            await m.react(global.done);
        }
        catch (e) {
            this.#logger.error(`Error in NpmSearchCommand: ${e.message}`);
            await conn.reply(m.chat, npmSearchMessages.error, m, global.fake);
            await m.react(global.error);
        }
    }
}
export default NpmSearchCommand;
//# sourceMappingURL=NpmSearchCommand.js.map