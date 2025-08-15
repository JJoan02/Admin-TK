import fetch from 'node-fetch';
let pinterestSessions = new Map();
const pinterestHandler = async (m, { conn, command, args, text, usedPrefix }) => {
    let session = pinterestSessions.get(m.chat) || {
        images: [],
        currentIndex: 0,
        query: text || ''
    };
    if (command === 'pinscroll') {
        if (!text) {
            return conn.reply(m.chat, `❌ Escribe lo que quieres buscar\nEjemplo: ${usedPrefix}pinscroll paisajes`, m);
        }
        session = {
            images: [],
            currentIndex: 0,
            query: text
        };
        pinterestSessions.set(m.chat, session);
        try {
            const response = await fetch(`https://api.agatz.xyz/api/pinsearch?message=${encodeURIComponent(text)}`);
            const data = await response.json();
            if (data.status !== 200 || !data.data?.length) {
                return conn.reply(m.chat, '❌ No se encontraron imágenes', m);
            }
            session.images = data.data;
            pinterestSessions.set(m.chat, session);
            return await sendImageWithButtons(session, m, conn);
        }
        catch (error) {
            console.error(error);
            return conn.reply(m.chat, '❌ Error al buscar imágenes', m);
        }
    }
    if (command === 'pinseguir') {
        if (!session.images.length) {
            return conn.reply(m.chat, '❌ Primero usa .pinscroll para buscar imágenes', m);
        }
        if (session.currentIndex < session.images.length - 1) {
            session.currentIndex++;
            return await sendImageWithButtons(session, m, conn);
        }
        else {
            return conn.reply(m.chat, '❌ Ya estás en la última imagen', m);
        }
    }
    if (command === 'pinatras') {
        if (!session.images.length) {
            return conn.reply(m.chat, '❌ Primero usa .pinscroll para buscar imágenes', m);
        }
        if (session.currentIndex > 0) {
            session.currentIndex--;
            return await sendImageWithButtons(session, m, conn);
        }
        else {
            return conn.reply(m.chat, '❌ Ya estás en la primera imagen', m);
        }
    }
};
async function sendImageWithButtons(session, m, conn) {
    const image = session.images[session.currentIndex];
    const caption = `
🖼️ *Imagen ${session.currentIndex + 1} de ${session.images.length}*
━━━━━━━━━━━━━━━━
📌 *Título*: ${image.grid_title || 'Sin título'}
📅 *Fecha*: ${image.created_at || 'Desconocida'}
🔗 *Enlace*: [Ver en Pinterest](${image.pin})
`.trim();
    try {
        await conn.sendMessage(m.chat, {
            image: { url: image.images_url },
            caption: caption,
            buttons: [
                { buttonId: 'pinatras', buttonText: { displayText: '.pinatras' }, type: 1 },
                { buttonId: 'pinseguir', buttonText: { displayText: '.pinseguir' }, type: 1 }
            ],
            viewOnce: true
        }, { quoted: m });
    }
    catch (error) {
        console.error(error);
        conn.reply(m.chat, '❌ Error al enviar la imagen', m);
    }
}
pinterestHandler.help = [
    'pinscroll <búsqueda>',
    'pinseguir',
    'pinatras'
];
pinterestHandler.tags = ['search', 'tools'];
pinterestHandler.command = /^(pinscroll|pinseguir|pinatras)$/i;
export default pinterestHandler;
//# sourceMappingURL=downloader-apkdl.js.map