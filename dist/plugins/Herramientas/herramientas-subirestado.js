import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
let handler = async (m, { conn, text }) => {
    if (!m.quoted && !text)
        throw '*⚠️ Ingrese un texto o responda a un archivo multimedia para subir como estado.*';
    let media = false;
    let mime = (m.quoted?.mimetype || m.mimetype) || '';
    let url = '';
    let caption = text || '';
    if (/image|video/.test(mime)) {
        media = await m.quoted.download();
        if (/video/.test(mime)) {
            url = await uploadFile(media);
        }
        else {
            url = await uploadImage(media);
        }
    }
    else if (/webp/.test(mime)) {
        media = await m.quoted.download();
        url = await uploadFile(media);
    }
    if (url && /image/.test(mime)) {
        await conn.sendMessage('status@broadcast', { image: { url }, caption });
    }
    else if (url && /video/.test(mime)) {
        await conn.sendMessage('status@broadcast', { video: { url }, caption });
    }
    else if (text) {
        await conn.sendMessage('status@broadcast', { text: caption });
    }
    else {
        throw '*⚠️ No se pudo procesar el archivo o mensaje para subir como estado.*';
    }
    m.reply('*✅ Estado subido con éxito. Asegúrate de que el bot está en tu lista de contactos y viceversa para visualizar los estados.*');
};
handler.help = ['subirestado'];
handler.tags = ['General'];
handler.command = /^subirestado$/i;
handler.register = false;
export default handler;
//# sourceMappingURL=herramientas-subirestado.js.map