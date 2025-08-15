import { ICommand, IPluginModule } from '../../types/plugin';
import axios from "axios";
import * as baileys from '@whiskeysockets/baileys';
import { GIMAGES_NO_QUERY, GIMAGES_NO_RESULTS, GIMAGES_CAPTION, GIMAGES_ERROR } from '../../content/descargas/gimages-download-responses';
async function sendAlbumMessage(conn, jid, medias, options = {}) {
    if (typeof jid !== "string") {
        throw new TypeError(`jid must be string, received: ${jid} (${jid?.constructor?.name})`);
    }
    for (const media of medias) {
        if (!media.type || (media.type !== "image" && media.type !== "video")) {
            throw new TypeError(`media.type must be "image" or "video", received: ${media.type} (${media.type?.constructor?.name})`);
        }
        if (!media.data || (!media.data.url && !Buffer.isBuffer(media.data))) {
            throw new TypeError(`media.data must be object with url or buffer, received: ${media.data} (${media.data?.constructor?.name})`);
        }
    }
    if (medias.length < 2) {
        throw new RangeError("Minimum 2 media");
    }
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
    for (let i = 0; i < medias.length; i++) {
        const { type, data } = medias[i];
        const img = await baileys.generateWAMessage(album.key.remoteJid, { [type]: data, ...(i === 0 ? { caption } : {}) }, { upload: conn.waUploadToServer });
        img.message.messageContextInfo = {
            messageAssociation: { associationType: 1, parentMessageKey: album.key },
        };
        await conn.relayMessage(img.key.remoteJid, img.message, { messageId: img.key.id });
        await baileys.delay(delay);
    }
    return album;
}
class GimagesDownloadPlugin {
    name = "GimagesDownloadPlugin";
    commands = [
        {
            name: "gimagenes",
            alias: [],
            desc: "Busca y descarga imágenes de Google.",
            category: "Descargas",
            react: "📸",
            execute: async (Yaka, m, { conn, args }) => {
                if (!args.length)
                    return m.reply(GIMAGES_NO_QUERY);
                let query = args.join(" ");
                let apiUrl = `https://delirius-apiofc.vercel.app/search/gimage?query=${encodeURIComponent(query)}`;
                try {
                    let res = await fetch(apiUrl);
                    let json = await res.json();
                    if (!json.status || !json.data.length)
                        return m.reply(GIMAGES_NO_RESULTS);
                    let images = json.data.slice(0, 15).map((img) => ({
                        type: "image",
                        data: { url: img.url }
                    }));
                    let caption = GIMAGES_CAPTION(query);
                    await sendAlbumMessage(conn, m.chat, images, { caption, quoted: m });
                }
                catch (error) {
                    console.error(error);
                    m.reply(GIMAGES_ERROR);
                }
            }
        }
    ];
}
export default GimagesDownloadPlugin;
//# sourceMappingURL=descargas-gimagenes.js.map