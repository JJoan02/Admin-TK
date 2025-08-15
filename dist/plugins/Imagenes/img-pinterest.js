import axios from "axios";
import baileys from "@whiskeysockets/baileys";
async function sendAlbumMessage(conn, jid, medias, options) {
    options = { ...options };
    if (typeof jid !== "string")
        throw new TypeError(`jid must be a string, received: ${jid}`);
    for (const media of medias) {
        if (!media.type || (media.type !== "image" && media.type !== "video"))
            throw new TypeError(`medias[i].type must be "image" or "video", received: ${media.type}`);
        if (!media.data || (!media.data.url && !Buffer.isBuffer(media.data)))
            throw new TypeError(`medias[i].data must be an object with url or buffer, received: ${media.data}`);
    }
    if (medias.length < 2)
        throw new RangeError("Se requieren al menos 2 medios.");
    const caption = options.text || options.caption || "";
    const delay = !isNaN(options.delay) ? options.delay : 500;
    delete options.text;
    delete options.caption;
    delete options.delay;
    const album = baileys.generateWAMessageFromContent(jid, {
        messageContextInfo: {},
        albumMessage: {
            expectedImageCount: medias.filter(media => media.type === "image").length,
            expectedVideoCount: medias.filter(media => media.type === "video").length,
            ...(options.quoted
                ? {
                    contextInfo: {
                        remoteJid: options.quoted.key.remoteJid,
                        fromMe: options.quoted.key.fromMe,
                        stanzaId: options.quoted.key.id,
                        participant: options.quoted.key.participant || options.quoted.key.remoteJid,
                        quotedMessage: options.quoted.message,
                    },
                }
                : {}),
        },
    }, {});
    await conn.relayMessage(album.key.remoteJid, album.message, { messageId: album.key.id });
    for (const i in medias) {
        const { type, data } = medias[i];
        const img = await baileys.generateWAMessage(album.key.remoteJid, { [type]: data, ...(i === "0" ? { caption } : {}) }, { upload: conn.waUploadToServer });
        img.message.messageContextInfo = {
            messageAssociation: { associationType: 1, parentMessageKey: album.key },
        };
        await conn.relayMessage(img.key.remoteJid, img.message, { messageId: img.key.id });
        await baileys.delay(delay);
    }
    return album;
}
let handler = async (m, { conn, args }) => {
    if (!args.length) {
        return m.reply("Por favor, proporciona una consulta.\n\nEjemplo: .pinterest gato");
    }
    await conn.sendMessage(m.chat, {
        react: { text: "⏱️", key: m.key },
    });
    try {
        const query = args.join(" ");
        const apiUrl = `https://api.dorratz.com/v2/pinterest?q=${encodeURIComponent(query)}`;
        const response = await axios.get(apiUrl);
        if (!Array.isArray(response.data) || response.data.length === 0) {
            return await conn.sendMessage(m.chat, { text: "No se encontraron resultados." }, { quoted: m });
        }
        const limitedData = response.data.slice(0, 10);
        const medias = limitedData.map(item => ({
            type: "image",
            data: { url: item.image_large_url },
            caption: `✧➢ *Fuente:* Pinterest`
        }));
        const albumCaption = "🌙 Imágenes encontradas en Pinterest";
        await sendAlbumMessage(conn, m.chat, medias, { caption: albumCaption, quoted: m });
    }
    catch (error) {
        console.error("Error durante la búsqueda en Pinterest:", error);
    }
};
handler.help = ["pinterest"];
handler.tags = ["search"];
handler.command = ["pinterest", "pin"];
export default handler;
//# sourceMappingURL=img-pinterest.js.map