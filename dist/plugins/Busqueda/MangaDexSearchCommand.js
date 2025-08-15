import { ICommand, IPluginModule } from '../../types/plugin';
import fetch from 'node-fetch';
import { generateWAMessageContent, generateWAMessageFromContent, proto } from '@whiskeysockets/baileys';
import { MANGADEX_NO_TEXT, MANGADEX_NOT_FOUND, MANGADEX_RESULT_TITLE, MANGADEX_RESULT_ID, MANGADEX_COPY_ID_BUTTON, MANGADEX_CAROUSEL_BODY, MANGADEX_CAROUSEL_FOOTER, MANGADEX_ERROR_SEARCH, MANGADEX_ERROR_GENERIC } from '../../content/busqueda/mangadex-responses';
class MangaDexSearchPlugin {
    name = "MangaDexSearchPlugin";
    commands = [
        {
            name: "mangadex",
            alias: ["searchmanga", "mangaid", "mangadexid", "mangasearch", "buscarmanga"],
            desc: "Busca manga en MangaDex y muestra los resultados.",
            category: "Busqueda",
            react: "📚",
            execute: async (Yaka, m, { conn, text }) => {
                if (!text) {
                    return conn.reply(m.chat, MANGADEX_NO_TEXT, m);
                }
                try {
                    await m.react(global.AdminTK_rwait);
                    let [language, ...mangaNameParts] = text.split("|").map((part) => part.trim());
                    let mangaName = mangaNameParts.join(" ");
                    let languageCode = null;
                    if (language) {
                        if (language.toLowerCase() === 'español') {
                            languageCode = 'es';
                        }
                        else if (language.toLowerCase() === 'inglés') {
                            languageCode = 'en';
                        }
                        else if (language.toLowerCase() === 'japonés') {
                            languageCode = 'ja';
                        }
                    }
                    const apiUrl = `https://api.mangadex.org/manga/?title=${encodeURIComponent(mangaName)}` +
                        (languageCode ? `&translatedLanguage[]=${languageCode}` : '');
                    const apiResponse = await fetch(apiUrl);
                    const jsonData = await apiResponse.json();
                    if (!jsonData.data || jsonData.data.length === 0) {
                        await conn.reply(m.chat, MANGADEX_NOT_FOUND, m);
                        await m.react('✖️');
                        return;
                    }
                    const messages = [];
                    for (let manga of jsonData.data) {
                        const mangaId = manga.id;
                        const mangaTitle = manga.attributes.title[languageCode] || manga.attributes.title.en || 'Título no disponible';
                        const coverArt = manga.relationships.find((rel) => rel.type === 'cover_art');
                        const coverUrl = coverArt && coverArt.attributes && coverArt.attributes.fileName
                            ? `https://uploads.mangadex.org/covers/${mangaId}/${coverArt.attributes.fileName}.256.jpg`
                            : null;
                        const image = await MangaDexSearchPlugin.createImageMessage(conn, coverUrl);
                        messages.push({
                            body: proto.Message.InteractiveMessage.Body.fromObject({
                                text: MANGADEX_RESULT_TITLE(mangaTitle)
                            }),
                            footer: proto.Message.InteractiveMessage.Footer.fromObject({
                                text: MANGADEX_RESULT_ID(mangaId)
                            }),
                            header: proto.Message.InteractiveMessage.Header.fromObject({
                                title: '',
                                hasMediaAttachment: true,
                                imageMessage: image
                            }),
                            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                                buttons: [{
                                        name: "cta_copy",
                                        buttonParamsJson: `{\"display_text\":\"${MANGADEX_COPY_ID_BUTTON}\",\"id\":\"${mangaId}\",\"copy_code\":\"${mangaId}\"}`
                                    }]
                            })
                        });
                    }
                    const messageContent = generateWAMessageFromContent(m.chat, {
                        viewOnceMessage: {
                            message: {
                                messageContextInfo: {
                                    deviceListMetadata: {},
                                    deviceListMetadataVersion: 2
                                },
                                interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                                    body: proto.Message.InteractiveMessage.Body.create({
                                        text: MANGADEX_CAROUSEL_BODY(mangaName)
                                    }),
                                    footer: proto.Message.InteractiveMessage.Footer.create({
                                        text: MANGADEX_CAROUSEL_FOOTER
                                    }),
                                    header: proto.Message.InteractiveMessage.Header.create({
                                        hasMediaAttachment: false
                                    }),
                                    carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                                        cards: [...messages]
                                    })
                                })
                            }
                        }
                    }, {});
                    await conn.relayMessage(m.chat, messageContent.message, { messageId: messageContent.key.id });
                    await m.react(global.AdminTK_done);
                }
                catch (e) {
                    console.error(`${MANGADEX_ERROR_SEARCH} ${e.message}`);
                    await conn.reply(m.chat, MANGADEX_ERROR_GENERIC(e.message), m);
                    await m.react('✖️');
                }
            }
        }
    ];
    static async createImageMessage(conn, url) {
        const defaultImageUrl = 'https://i.ibb.co/NCjGCJB/file.jpg';
        const { imageMessage } = await generateWAMessageContent({ image: { url: url || defaultImageUrl } }, { upload: conn.waUploadToServer });
        return imageMessage;
    }
}
export default MangaDexSearchPlugin;
//# sourceMappingURL=MangaDexSearchCommand.js.map