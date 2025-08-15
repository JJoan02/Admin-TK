import { PRECIOS_HEADER, PRECIOS_LIST, PRECIOS_FOOTER, PRECIOS_ERROR } from '../../content/administracion_grupos/precios-responses';
import { PRECIOS_IMAGE_URL } from '../../../config/redes_sociales/socialMediaConfig';
class PreciosPlugin {
    name = "PreciosPlugin";
    commands = [
        {
            name: "precios",
            alias: ["precios2", "p2"],
            desc: "Muestra la lista de precios de los servicios del bot.",
            category: "Administración/Grupos",
            react: "💰",
            execute: async (Yaka, m, { conn, isGroup }) => {
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                await m.react('⭐');
                const message = `${PRECIOS_HEADER}\n\n${PRECIOS_LIST}\n\n${PRECIOS_FOOTER}`;
                try {
                    await conn.sendMessage(m.chat, { image: { url: PRECIOS_IMAGE_URL }, caption: message }, { mimetype: 'image/jpeg' });
                }
                catch (e) {
                    console.error("Error al mostrar precios:", e);
                    m.reply(PRECIOS_ERROR);
                }
            }
        }
    ];
}
export default PreciosPlugin;
//# sourceMappingURL=precios_plugin.js.map