import cp from 'child_process';
import { promisify } from 'util';
const exec = promisify(cp.exec).bind(cp);
const handler = async (m) => {
    let o;
    try {
        conn.reply(m.chat, '🚀 Speed Test....', m, {
            contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, showAdAttribution: true,
                    title: packname,
                    body: dev,
                    previewType: 0, thumbnail: icons,
                    sourceUrl: channel } }
        });
        o = await exec('python3 ./lib/ookla-speedtest.py --secure --share');
        const { stdout, stderr } = o;
        if (stdout.trim()) {
            const match = stdout.match(/http[^"]+\.png/);
            const urlImagen = match ? match[0] : null;
            await conn.sendMessage(m.chat, { image: { url: urlImagen }, caption: stdout.trim() }, { quoted: fkontak });
        }
        if (stderr.trim()) {
            const match2 = stderr.match(/http[^"]+\.png/);
            const urlImagen2 = match2 ? match2[0] : null;
            await conn.sendMessage(m.chat, { image: { url: urlImagen2 }, caption: stderr.trim() }, { quoted: fkontak });
        }
    }
    catch (e) {
        o = e.message;
        return m.reply(o);
    }
};
handler.help = ['speedtest'];
handler.tags = ['info'];
handler.command = ['speedtest', 'info', 'speed'];
handler.register = true;
export default handler;
//# sourceMappingURL=info-speedtest.js.map