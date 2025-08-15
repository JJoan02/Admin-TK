import fetch from 'node-fetch';
const handler = async (m, { conn, text, command }) => {
    if (!text) {
        return conn.reply(m.chat, '❌ Por favor proporciona un enlace válido para descargar el video.', m);
    }
    const servers = [
        { name: 'Servidor Masha', baseUrl: masha },
        { name: 'Servidor Alya', baseUrl: alya },
        { name: 'Servidor Masachika', baseUrl: masachika },
    ];
    async function tryServers(serversList) {
        if (serversList.length === 0)
            throw '❌ Todos los servidores fallaron. Intenta más tarde.';
        const [currentServer, ...rest] = serversList;
        try {
            await conn.reply(m.chat, `🔄 Intentando descargar video desde ${currentServer.name}...`, m);
            const apiUrl = `${currentServer.baseUrl}/download_videoV2?url=${encodeURIComponent(text)}`;
            const res = await fetch(apiUrl);
            if (!res.ok)
                throw new Error(`HTTP error ${res.status}`);
            const result = await res.json();
            if (!result || !result.file_url) {
                throw new Error('No se recibió URL de video');
            }
            return { result, server: currentServer };
        }
        catch (e) {
            console.error(`Error en ${currentServer.name}:`, e.message || e);
            return tryServers(rest);
        }
    }
    try {
        const { result, server } = await tryServers(shuffleArray(servers));
        const caption = `✅ Video descargado correctamente.\n` +
            `🎬 Título: ${result.title || 'N/A'}\n` +
            `⏱ Duración: ${result.duration ? `${result.duration} seg` : 'N/A'}\n` +
            `👍 Likes: ${result.likes || 'N/A'}\n` +
            `💬 Comentarios: ${result.comments || 'N/A'}\n` +
            `👁 Views: ${result.views || 'N/A'}\n` +
            `📺 Calidad: ${result.quality || 'N/A'}\n` +
            `📡 Procesado por: ${server.name}`;
        await conn.sendMessage(m.chat, {
            video: { url: result.file_url },
            caption,
        }, { quoted: m });
    }
    catch (e) {
        console.error(e);
        conn.reply(m.chat, e.toString(), m);
    }
};
function shuffleArray(array) {
    let arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
handler.command = ['yt', 'ytv'];
export default handler;
//# sourceMappingURL=yt-dl-ytv.js.map