import fetch from 'node-fetch';
let handler = async (m, { conn, args, command }) => {
    if (!args[0])
        throw '⚠️ Proporciona la URL de una presentacion de tiktok de TikTok.\n\nEjemplo:\n.ttsl https://vt.tiktok.com/ZSBy3kxKw/';
    const url = args[0];
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
            const apiUrl = `${currentServer.baseUrl}/Tiktok_slidesdl?url=${encodeURIComponent(url)}`;
            const res = await fetch(apiUrl);
            if (!res.ok)
                throw new Error(`HTTP error ${res.status}`);
            const json = await res.json();
            if (!json.slides || !Array.isArray(json.slides) || json.slides.length === 0) {
                throw new Error('No se encontraron slides en la respuesta');
            }
            return { json, server: currentServer };
        }
        catch (e) {
            console.error(`Error en ${currentServer.name}:`, e.message || e);
            return tryServers(rest);
        }
    }
    try {
        const { json, server } = await tryServers(shuffleArray(servers));
        await conn.sendMessage(m.chat, {
            image: { url: json.slides[0] },
            caption: `✅ Imágenes extraídas exitosamente.\nTotal: ${json.slides.length}\n Procesado por: ${server.name}`,
        }, { quoted: m });
        for (let i = 1; i < json.slides.length; i++) {
            await conn.sendFile(m.chat, json.slides[i], `slide${i}.jpg`, '', m);
        }
    }
    catch (e) {
        console.error(e);
        throw e.toString();
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
handler.help = ['ttsl <url>', 'ttph <url>'];
handler.tags = ['descargas'];
handler.command = ['ttp', 'ttsl', 'ttph'];
export default handler;
//# sourceMappingURL=descargas-tiktok-img.js.map