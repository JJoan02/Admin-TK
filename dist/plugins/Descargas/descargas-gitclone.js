import { ICommand, IPluginModule } from '../../types/plugin';
import fetch from 'node-fetch';
import { GITCLONE_NO_URL, GITCLONE_INVALID_URL, GITCLONE_HEADER, GITCLONE_NAME, GITCLONE_REPO, GITCLONE_CREATOR, GITCLONE_DESCRIPTION, GITCLONE_NO_DESCRIPTION, GITCLONE_URL, GITCLONE_FOOTER, GITCLONE_ERROR } from '../../content/descargas/gitclone-download-responses';
class GitClonePlugin {
    name = "GitClonePlugin";
    commands = [
        {
            name: "gitclone",
            alias: [],
            desc: "Descarga un repositorio de GitHub como archivo ZIP.",
            category: "Descargas",
            react: "📦",
            execute: async (Yaka, m, { conn, args, usedPrefix, command }) => {
                if (!args[0]) {
                    return conn.reply(m.chat, GITCLONE_NO_URL, m);
                }
                const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
                if (!regex.test(args[0])) {
                    return conn.reply(m.chat, GITCLONE_INVALID_URL, m).then((_) => m.react('✖️'));
                }
                let [_, user, repo] = args[0].match(regex) || [];
                let sanitizedRepo = repo.replace(/.git$/, '');
                let repoUrl = `https://api.github.com/repos/${user}/${sanitizedRepo}`;
                let zipUrl = `https://api.github.com/repos/${user}/${sanitizedRepo}/zipball`;
                await m.react('🕓');
                try {
                    let [repoResponse, zipResponse] = await Promise.all([
                        fetch(repoUrl),
                        fetch(zipUrl),
                    ]);
                    let repoData = await repoResponse.json();
                    let filename = zipResponse.headers.get('content-disposition')?.match(/attachment; filename=(.*)/)?.[1];
                    let type = zipResponse.headers.get('content-type');
                    let img = 'https://i.ibb.co/tLKyhgM/file.png';
                    let txt = GITCLONE_HEADER;
                    txt += `${GITCLONE_NAME} ${filename}\n`;
                    txt += `${GITCLONE_REPO} ${user}/${sanitizedRepo}\n`;
                    txt += `${GITCLONE_CREATOR} ${repoData.owner.login}\n`;
                    txt += `${GITCLONE_DESCRIPTION} ${repoData.description || GITCLONE_NO_DESCRIPTION}\n`;
                    txt += `${GITCLONE_URL} ${args[0]}\n\n`;
                    txt += GITCLONE_FOOTER(global.textbot);
                    await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, global.fake);
                    await conn.sendFile(m.chat, await zipResponse.buffer(), filename, null, m);
                    await m.react('✅');
                }
                catch (e) {
                    await m.react('✖️');
                    conn.reply(m.chat, GITCLONE_ERROR, m);
                }
            }
        }
    ];
}
export default GitClonePlugin;
//# sourceMappingURL=descargas-gitclone.js.map