import { HELP_MENU_TITLE, HELP_MENU_BASIC_COMMANDS, HELP_MENU_GROUP_COMMANDS, HELP_MENU_MOD_COMMANDS, HELP_MENU_FUN_COMMANDS, HELP_MENU_MEDIA_COMMANDS, HELP_MENU_SEARCH_COMMANDS, HELP_MENU_UTILITIES_COMMANDS, HELP_MENU_IMAGE_EDIT_COMMANDS, HELP_MENU_AUDIO_COMMANDS, HELP_MENU_ESSENTIALS_COMMANDS, HELP_MENU_WEEB_COMMANDS, HELP_MENU_REACTION_COMMANDS, HELP_MENU_LOGO_MAKER_COMMANDS, HELP_MENU_MINECRAFT_COMMANDS, HELP_MENU_ECONOMY_COMMANDS, HELP_MENU_FOOTER } from '../../content/help-responses';
const ayudaPlugin = {
    nombre: "ayuda",
    descripcion: "Muestra la lista de todos los comandos del bot.",
    comando: ["help", "menu", "h", "helpm", "helpmenu"],
    categoria: "Core",
    react: "🤖",
    ejecutar: async (Yaka, m, { prefix, pushName, NSFWstatus, args, commands, uptime }) => {
        const pad = (s) => (s < 10 ? "0" : "") + s;
        let txt = `${HELP_MENU_TITLE}\n\n`;
        txt += `${HELP_MENU_BASIC_COMMANDS(prefix)}\n ══════════════════════\n`;
        txt += `${HELP_MENU_GROUP_COMMANDS(prefix)}\n ══════════════════════\n`;
        txt += `${HELP_MENU_MOD_COMMANDS(prefix)}\n ══════════════════════\n`;
        txt += `${HELP_MENU_FUN_COMMANDS(prefix)}\n ══════════════════════\n`;
        txt += `${HELP_MENU_MEDIA_COMMANDS(prefix)}\n ══════════════════════\n`;
        txt += `${HELP_MENU_SEARCH_COMMANDS(prefix)}\n ══════════════════════\n`;
        txt += `${HELP_MENU_UTILITIES_COMMANDS(prefix)}\n ══════════════════════\n`;
        txt += `${HELP_MENU_IMAGE_EDIT_COMMANDS(prefix)}\n ══════════════════════\n`;
        txt += `${HELP_MENU_AUDIO_COMMANDS(prefix)}\n ══════════════════════\n`;
        txt += `${HELP_MENU_ESSENTIALS_COMMANDS(prefix)}\n ══════════════════════\n`;
        txt += `${HELP_MENU_WEEB_COMMANDS(prefix)}\n ══════════════════════\n`;
        txt += `${HELP_MENU_REACTION_COMMANDS(prefix)}\n ══════════════════════\n`;
        txt += `${HELP_MENU_LOGO_MAKER_COMMANDS(prefix)}\n ══════════════════════\n`;
        txt += `${HELP_MENU_MINECRAFT_COMMANDS(prefix)}\n ══════════════════════\n`;
        txt += `${HELP_MENU_ECONOMY_COMMANDS(prefix)}\n ══════════════════════\n\n`;
        txt += `${HELP_MENU_FOOTER(uptime)}`;
        await Yaka.sendMessage(m.from, {
            video: { url: botVideo },
            caption: txt,
            gifPlayback: true
        }, { quoted: m });
    }
};
export default ayudaPlugin;
//# sourceMappingURL=ayuda.js.map