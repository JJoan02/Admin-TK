import { ICommand, IPluginModule } from '../../types/plugin';
import translate from '@vitalets/google-translate-api';
import { ADVICE_TEXT_HEADER, ADVICE_TEXT_FOOTER, ADVICE_DEFAULT_IMAGE, ADVICE_BUTTON_NEXT, ADVICE_BUTTON_MENU, ADVICE_ERROR_REPORT } from '../../content/descargas/advice-responses';
class AdvicePlugin {
    name = "AdvicePlugin";
    commands = [
        {
            name: "consejo",
            alias: ["advice", "frase2", "phrase2"],
            desc: "Obtiene un consejo o frase motivacional aleatoria.",
            category: "Descargas",
            react: "💡",
            execute: async (Yaka, m, { conn, usedPrefix, command }) => {
                try {
                    await m.react(global.rwait);
                    let list = global.motivation;
                    const contenido = list[Math.floor(Math.random() * list.length)];
                    const result = await translate(`${contenido}`, { to: global.lenguajeGB.lenguaje(), autoCorrect: true });
                    const texto = `${ADVICE_TEXT_HEADER}\n*ღ _${result.text}_*${ADVICE_TEXT_FOOTER}`;
                    const img = ADVICE_DEFAULT_IMAGE;
                    await conn.sendButton(m.chat, texto.trim(), global.wm, img, [
                        [ADVICE_BUTTON_NEXT(global.lenguajeGB.smsConj()), `${usedPrefix + command}`],
                        [ADVICE_BUTTON_MENU(global.lenguajeGB.smsConMenu()), `${usedPrefix}menu`]
                    ], null, global.fkontak);
                    await m.react('✅');
                }
                catch (e) {
                    console.error(`Error al obtener consejo/frase: ${e.message}`);
                    await conn.reply(m.chat, ADVICE_ERROR_REPORT(global.lenguajeGB.smsMalError3(), global.lenguajeGB.smsMensError2(), usedPrefix, command, global.wm), m);
                    await m.react('✖️');
                }
            }
        }
    ];
}
export default AdvicePlugin;
//# sourceMappingURL=AdviceCommand.js.map