import { Command } from '../../core/Command.js';
import { promises as fs } from 'fs';
import path from 'path';
import { deleteSessionMessages } from '../../lib/informacion-content.js';
import { jadibotDeleteSessionMessages } from '../../lib/jadibot-content.js';
class DeleteSessionCommand extends Command {
    #logger;
    constructor(logger) {
        super('ds', 'Elimina archivos de sesión del bot.');
        this.#logger = logger;
        this.commands = ['fixmsgespera', 'ds', 'eliminarjb'];
    }
    async execute(context) {
        const { m, conn, usedPrefix, command } = context;
        if (global.conn.user.jid !== conn.user.jid) {
            await conn.reply(m.chat, deleteSessionMessages.notMainBot, m, global.rcanal);
            return;
        }
        const chatId = m.isGroup ? m.chat : m.sender;
        const uniqid = chatId.split('@')[0];
        const sessionPath = `./GataBotSession/`;
        try {
            const files = await fs.readdir(sessionPath);
            let filesDeleted = 0;
            for (const file of files) {
                if (file.includes(uniqid)) {
                    await fs.unlink(path.join(sessionPath, file));
                    filesDeleted++;
                }
            }
            if (filesDeleted === 0) {
                await conn.reply(m.chat, jadibotDeleteSessionMessages.noFilesFound(global.lenguajeGB.smsAvisoAG()), m);
            }
            else {
                await conn.reply(m.chat, jadibotDeleteSessionMessages.filesDeleted(global.lenguajeGB.smsAvisoEG(), filesDeleted), m);
                await conn.reply(m.chat, jadibotDeleteSessionMessages.botReady(global.lenguajeGB.smsAvisoRG(), usedPrefix), m);
            }
        }
        catch (err) {
            this.#logger.error('Error al leer la carpeta o los archivos de sesión:', err);
            if (err.code === 'ENOENT') {
                await conn.reply(m.chat, jadibotDeleteSessionMessages.folderOrFileNotFound(global.lenguajeGB.smsAvisoFG()), m);
            }
            else {
                await conn.reply(m.chat, jadibotDeleteSessionMessages.errorDeleting(global.lenguajeGB.smsAvisoFG()), m);
            }
        }
    }
}
export default DeleteSessionCommand;
//# sourceMappingURL=DeleteSessionCommand.js.map