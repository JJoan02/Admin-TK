import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
class GitCloneCommand extends Command {
    #logger;
    constructor(logger) {
        super('gitclone', 'Descarga un repositorio de GitHub como archivo ZIP. Uso: !gitclone <url del repositorio>');
        this.#logger = logger;
        this.commands = ['gitclone'];
    }
    async execute(context) {
        const { m, conn, args, usedPrefix, command } = context;
        if (!args[0]) {
            await conn.reply(m.chat, `🚩 Escribe la URL de un repositorio de GitHub que deseas descargar.`, m);
            return;
        }
        const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
        if (!regex.test(args[0])) {
            await conn.reply(m.chat, `Verifica que la *URL* sea de GitHub`, m);
            await m.react('✖️');
            return;
        }
        const [_, user, repo] = args[0].match(regex) || [];
        const sanitizedRepo = repo.replace(/.git$/, '');
        const repoUrl = `https://api.github.com/repos/${user}/${sanitizedRepo}`;
        const zipUrl = `https://api.github.com/repos/${user}/${sanitizedRepo}/zipball`;
        try {
            await m.react(global.rwait);
            const [repoResponse, zipResponse] = await Promise.all([
                fetch(repoUrl),
                fetch(zipUrl),
            ]);
            const repoData = await repoResponse.json();
            const filenameMatch = zipResponse.headers.get('content-disposition')?.match(/attachment; filename=(.*)/);
            const filename = filenameMatch ? filenameMatch[1] : `${sanitizedRepo}.zip`;
            let txt = `*乂 G I T H U B - D O W N L O A D*\n\n`;
            txt += `  ✩  *Nombre* : ${filename}\n`;
            txt += `  ✩  *Repositorio* : ${user}/${sanitizedRepo}\n`;
            txt += `  ✩  *Creador* : ${repoData.owner?.login || 'N/A'}\n`;
            txt += `  ✩  *Descripción* : ${repoData.description || 'Sin descripción disponible'}\n`;
            txt += `  ✩  *Url* : ${args[0]}\n\n`;
            txt += `🚩 *${global.textbot}*`;
            const img = 'https://i.ibb.co/tLKyhgM/file.png';
            await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, global.fake);
            await conn.sendFile(m.chat, await zipResponse.buffer(), filename, null, m);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al clonar repositorio de GitHub: ${e.message}`);
            await conn.react('✖️');
            await conn.reply(m.chat, `Ocurrió un error al intentar descargar el repositorio.`, m);
        }
    }
}
export default GitCloneCommand;
//# sourceMappingURL=GitCloneCommand.js.map