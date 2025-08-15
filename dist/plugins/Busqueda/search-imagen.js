import { ICommand, IPluginModule } from '../../types/plugin';
import fetch from 'node-fetch';
import { generateWAMessageContent, generateWAMessageFromContent, proto } from '@whiskeysockets/baileys';
import { IMAGE_SEARCH_NO_TEXT, IMAGE_SEARCH_RESULTS_HEADER, IMAGE_SEARCH_RESULTS_FOOTER, IMAGE_SEARCH_RESULT_ITEM, IMAGE_SEARCH_VIEW_IMAGE_BUTTON, IMAGE_SEARCH_ERROR } from '../../content/busqueda/image-search-responses';
class ImageSearchPlugin {
    name = "ImageSearchPlugin";
    commands = [
        {
            name: "imagen",
            alias: ["image"],
            desc: "Busca imágenes en Google.",
            category: "Busqueda",
            react: "🖼️",
            execute: async (Yaka, m, { conn, text }) => {
                if (!text)
                    return m.reply(IMAGE_SEARCH_NO_TEXT);
                await m.react('🕓');
                try {
                    async function createImage(url) {
                        const { imageMessage } = await generateWAMessageContent({ image: { url } }, { upload: conn.waUploadToServer });
                        return imageMessage;
                    }
                    let push = [];
                    let api = await fetch(`https://api.diioffc.web.id/api/search/gimage?query=${encodeURIComponent(text)}`);
                    let json = await api.json();
                    for (let result of json.result) {
                        let image = await createImage(result.link);
                        push.push({
                            body: proto.Message.InteractiveMessage.Body.fromObject({
                                text: IMAGE_SEARCH_RESULT_ITEM(result.title, result.snippet)
                            }),
                            footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: '' }),
                            header: proto.Message.InteractiveMessage.Header.fromObject({
                                title: '',
                                hasMediaAttachment: true,
                                imageMessage: image
                            }),
                            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                                buttons: [
                                    {
                                        "name": "cta_url",
                                        "buttonParamsJson": `{\"display_text\":\"${IMAGE_SEARCH_VIEW_IMAGE_BUTTON}\",\"url\":\"${result.image.contextLink}\"}`
                                    }
                                ]
                            })
                        });
                    }
                    const msg = generateWAMessageFromContent(m.chat, {
                        viewOnceMessage: {
                            message: {
                                messageContextInfo: {
                                    deviceListMetadata: {},
                                    deviceListMetadataVersion: 2
                                },
                                interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                                    body: proto.Message.InteractiveMessage.Body.create({ text: IMAGE_SEARCH_RESULTS_HEADER(text) }),
                                    footer: proto.Message.InteractiveMessage.Footer.create({ text: IMAGE_SEARCH_RESULTS_FOOTER }),
                                    header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
                                    carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...push] })
                                })
                            }
                        }
                    }, { 'quoted': m });
                    await m.react('✅');
                    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
                }
                catch (error) {
                    console.error(error);
                    return conn.reply(m.chat, IMAGE_SEARCH_ERROR(error.message), m);
                }
            }
        }
    ];
}
export default ImageSearchPlugin;
//# sourceMappingURL=search-imagen.js.map