import fetch from "node-fetch";
import { IMAGE_GEN_NO_PROMPT, IMAGE_GEN_EXAMPLE, IMAGE_GEN_GENERATING_MESSAGE, IMAGE_GEN_SUCCESS_CAPTION, IMAGE_GEN_ERROR_API_REQUEST, IMAGE_GEN_ERROR_PROCESSING, BOT_NAME_IMAGE_GEN } from '../../content/image-generation-responses';
import { IMAGE_GENERATION_API_URL } from '../../../config/redes_sociales/socialMediaConfig';
class GenerarImagenPlugin {
    name = "GenerarImagenPlugin";
    commands = [
        {
            name: "generar_imagen",
            alias: ["crear"],
            desc: "Genera una imagen a partir de un texto.",
            category: "Herramientas/IA",
            react: "🎨",
            execute: async (Yaka, m, { conn, text, usedPrefix, command }) => {
                if (!text) {
                    return conn.sendMessage(m.chat, {
                        text: `${IMAGE_GEN_NO_PROMPT}\n\n${IMAGE_GEN_EXAMPLE(usedPrefix + command)}`,
                    });
                }
                await conn.sendMessage(m.chat, {
                    text: IMAGE_GEN_GENERATING_MESSAGE(BOT_NAME_IMAGE_GEN),
                });
                try {
                    const apiUrl = `${IMAGE_GENERATION_API_URL}?prompt=${encodeURIComponent(text)}`;
                    const response = await fetch(apiUrl);
                    if (!response.ok) {
                        throw new Error(IMAGE_GEN_ERROR_API_REQUEST(response.statusText));
                    }
                    const imageBuffer = await response.buffer();
                    await conn.sendMessage(m.chat, {
                        image: imageBuffer,
                        caption: IMAGE_GEN_SUCCESS_CAPTION(BOT_NAME_IMAGE_GEN),
                    });
                }
                catch (error) {
                    console.error("Error al generar la imagen:", error);
                    await conn.sendMessage(m.chat, {
                        text: IMAGE_GEN_ERROR_PROCESSING(error.message),
                    });
                }
            }
        }
    ];
}
export default GenerarImagenPlugin;
//# sourceMappingURL=generar_imagen_plugin.js.map