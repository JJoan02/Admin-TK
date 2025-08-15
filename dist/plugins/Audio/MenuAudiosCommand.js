import { MENU_AUDIOS_LIST_MESSAGE_TEXT, MENU_AUDIOS_LIST_MESSAGE_FOOTER, MENU_AUDIOS_LIST_MESSAGE_TITLE, MENU_AUDIOS_LIST_MESSAGE_BUTTON_TEXT, MENU_AUDIOS_SECTIONS, MENU_AUDIOS_ERROR_MESSAGE } from '../../content/audio/menu-audios-responses';
class MenuAudiosPlugin {
    name = "MenuAudiosPlugin";
    commands = [
        {
            name: "audios",
            alias: ["menu2", "menuaudio", "menuaudios", "memuaudios", "memuaudio"],
            desc: "Muestra un menú de audios disponibles.",
            category: "Audio",
            react: "🎧",
            execute: async (Yaka, m, { conn, usedPrefix, command }) => {
                try {
                    const wm = "Admin-TK";
                    const lenguajeGB = {
                        smsTex16: () => "Audios",
                        smsTex19: () => "Comandos de Audio",
                        smsBotonM1: () => "MENU",
                        smsBotonM2: () => "ALL MENU",
                        smsBotonM3: () => "INVENTARIO",
                        smsMalError3: () => "Error",
                        smsMensError1: () => "Ocurrió un error",
                        smsMensError2: () => "Reporte",
                        smsLista2: () => "Creadora",
                        smsLista5: () => "Info Menu",
                        smsLista6: () => "All Menu",
                    };
                    const fkontak = {};
                    const pp = "https://example.com/placeholder.jpg";
                    const listMessage = {
                        text: MENU_AUDIOS_LIST_MESSAGE_TEXT,
                        footer: MENU_AUDIOS_LIST_MESSAGE_FOOTER,
                        title: MENU_AUDIOS_LIST_MESSAGE_TITLE,
                        buttonText: MENU_AUDIOS_LIST_MESSAGE_BUTTON_TEXT,
                        sections: MENU_AUDIOS_SECTIONS
                    };
                    await conn.sendMessage(m.chat, listMessage, { quoted: fkontak });
                }
                catch (e) {
                    console.error(e);
                    await m.reply(MENU_AUDIOS_ERROR_MESSAGE(global.lenguajeGB?.smsMalError3(), global.lenguajeGB?.smsMensError1(), global.lenguajeGB?.smsMensError2(), usedPrefix, command));
                }
            }
        }
    ];
}
export default MenuAudiosPlugin;
//# sourceMappingURL=MenuAudiosCommand.js.map