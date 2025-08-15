import { ICommand, IPluginModule } from '../../types/plugin';
import fetch from 'node-fetch';
import { generateWAMessageContent, generateWAMessageFromContent, proto } from '@whiskeysockets/baileys';
import { ANIMEFLV_NO_TEXT, ANIMEFLV_NOT_FOUND, ANIMEFLV_RESULT_TITLE, ANIMEFLV_RESULT_SCORE, ANIMEFLV_RESULT_SCORE_UNAVAILABLE, ANIMEFLV_RESULT_ID, ANIMEFLV_CAROUSEL_BODY, ANIMEFLV_CAROUSEL_FOOTER, ANIMEFLV_ERROR_SEARCH, ANIMEFLV_ERROR_GENERIC } from '../../content/busqueda/animeflv-responses';
class AnimeFLVSearchPlugin {
    name = "AnimeFLVSearchPlugin";
    commands = [
        {
            name: "animeflv",
            alias: ["searchanime", "animesearch", "animeid", "animeflvbuscar", "buscarnime", "animebuscar"],
            desc: "Busca anime en AnimeFLV y muestra los resultados.",
            category: "Busqueda",
            react: "🔍",
            execute: async (Yaka, m, { conn, text }) => {
                if (!text) {
                    return conn.reply(m.chat, ANIMEFLV_NO_TEXT, m);
                }
                try {
                    await m.react(global.AdminTK_rwait);
                    const response = await fetch(`https://animeflvapi.vercel.app/search?text=${encodeURIComponent(text)}`);
                    const data = await response.json();
                    if (!data.results || data.results.length === 0) {
                        await conn.reply(m.chat, ANIMEFLV_NOT_FOUND, m);
                        await m.react('✖️');
                        return;
                    }
                    const resultsArray = [];
                    for (let anime of data.results) {
                        const animeId = anime.id;
                        const animeTitle = anime.title || '✧ Titulo no disponible';
                        const animeScore = anime.score ? ANIMEFLV_RESULT_SCORE(anime.score) : ANIMEFLV_RESULT_SCORE_UNAVAILABLE;
                        const imageMessage = await AnimeFLVSearchPlugin.createImageMessage(conn, anime.poster || 'https://i.ibb.co/hcnfCQS/file.jpg');
                        resultsArray.push({
                            body: proto.Message.InteractiveMessage.Body.fromObject({
                                text: `${ANIMEFLV_RESULT_TITLE(animeTitle)}
${animeScore}`
                            }),
                            footer: proto.Message.InteractiveMessage.Footer.fromObject({
                                text: ANIMEFLV_RESULT_ID(animeId)
                            }),
                            header: proto.Message.InteractiveMessage.Header.fromObject({
                                title: '',
                                hasMediaAttachment: true,
                                imageMessage: imageMessage
                            }),
                            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                                buttons: [{
                                        name: "cta_copy",
                                        buttonParamsJson: `{\"display_text\":\"✎ Copiar ID\",\"id\":\"${animeId}\",\"copy_code\":\"${animeId}\"}`
                                    }]
                            })
                        });
                    }
                    const message = generateWAMessageFromContent(m.chat, {
                        viewOnceMessage: {
                            message: {
                                messageContextInfo: {
                                    deviceListMetadata: {},
                                    deviceListMetadataVersion: 2
                                },
                                interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                                    body: proto.Message.InteractiveMessage.Body.create({
                                        text: ANIMEFLV_CAROUSEL_BODY(text)
                                    }),
                                    footer: proto.Message.InteractiveMessage.Footer.create({
                                        text: ANIMEFLV_CAROUSEL_FOOTER
                                    }),
                                    header: proto.Message.InteractiveMessage.Header.create({
                                        hasMediaAttachment: false
                                    }),
                                    carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                                        cards: [...resultsArray]
                                    })
                                })
                            }
                        }
                    }, {});
                    await conn.relayMessage(m.chat, message.message, { messageId: message.key.id });
                    await m.react(global.AdminTK_done);
                }
                catch (e) {
                    console.error(`${ANIMEFLV_ERROR_SEARCH} ${e.message}`);
                    await conn.reply(m.chat, ANIMEFLV_ERROR_GENERIC(e.message), m);
                    await m.react('✖️');
                }
            }
        }
    ];
    static async createImageMessage(conn, url) {
        const defaultImageUrl = 'https://i.ibb.co/hcnfCQS/file.jpg';
        const { imageMessage } = await generateWAMessageContent({ image: { url: url || defaultImageUrl } }, { upload: conn.waUploadToServer });
        return imageMessage;
    }
}
export default AnimeFLVSearchPlugin;
//# sourceMappingURL=AnimeFLVSearchCommand.js.map