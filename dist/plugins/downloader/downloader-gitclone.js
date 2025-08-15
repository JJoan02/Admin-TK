import fetch from 'node-fetch';
import { downloaderMessages } from '../../content/downloader-content.js';
let regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
let handler = async (m, { args, usedPrefix, command }) => {
    if (!args[0]) {
        return m.reply(downloaderMessages.gitcloneUsage(usedPrefix, command));
    }
    if (!regex.test(args[0])) {
        return m.reply(downloaderMessages.gitcloneInvalidUrl).then(_ => m.react('✖️'));
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
        let filename = zipResponse.headers.get('content-disposition').match(/attachment; filename=(.*)/)[1];
        let type = zipResponse.headers.get('content-type');
        let img = 'https://i.ibb.co/tLKyhgM/file.png';
        let txt = `${downloaderMessages.gitcloneDownloadHeader}\n\n`;
        txt += `\t✩  ${downloaderMessages.gitcloneName} : ${filename}\n`;
        txt += `\t✩  ${downloaderMessages.gitcloneRepo} : ${user}/${sanitizedRepo}\n`;
        txt += `\t✩  ${downloaderMessages.gitcloneCreator} : ${repoData.owner.login}\n`;
        txt += `\t✩  ${downloaderMessages.gitcloneDescription} : ${repoData.description || downloaderMessages.gitcloneNoDescription}\n`;
        txt += `\t✩  ${downloaderMessages.gitcloneUrl} : ${args[0]}\n\n`;
        txt += `🚩 *${global.AdminTK_botInfo.botName}*`;
        await m.conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null);
        await m.conn.sendFile(m.chat, await zipResponse.buffer(), filename, null, m);
        await m.react('✅');
    }
    catch (e) {
        console.error(e);
        await m.react('✖️');
    }
};
handler.help = ['gitclone *<url git>*'];
handler.tags = ['downloader'];
handler.command = ['gitclone'];
handler.register = true;
export default handler;
//# sourceMappingURL=downloader-gitclone.js.map