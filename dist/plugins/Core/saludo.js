import { GREETING_OHAYO, GREETING_KONNICHIWA, GREETING_KONBANWA, COMMAND_NOT_FOUND, COMMAND_INFO_TITLE, COMMAND_INFO_COMMAND, COMMAND_INFO_ALIAS, COMMAND_INFO_COOLDOWN, COMMAND_INFO_DESCRIPTION, COMMAND_INFO_EXAMPLE, HELP_BUTTON_TEXT, BOT_NAME_PLACEHOLDER, HELP_MENU_HEADER, HELP_MENU_GREETING, HELP_MENU_BOT_INFO, HELP_MENU_COMMAND_LIST_PROMPT, ZERO_TWO_DANCE_VIDEO_URL } from '../../content/core/saludo-responses';
class SaludoPlugin {
    name = "SaludoPlugin";
    commands = [
        {
            name: "saludo",
            alias: ["hi", "hello", "moshimoshi", "yoo", "konichiwa", "konnichiwa"],
            desc: "Saluda al bot y muestra información de comandos.",
            category: "Core",
            react: "💜",
            execute: async (Yaka, m, { prefix, pushName, args, commands, text, uptime }) => {
                const now = new Date();
                const hour = now.getHours();
                let greeting;
                if (hour >= 0 && hour < 12) {
                    greeting = GREETING_OHAYO;
                }
                else if (hour >= 12 && hour < 18) {
                    greeting = GREETING_KONNICHIWA;
                }
                else {
                    greeting = GREETING_KONBANWA;
                }
                if (args[0]) {
                    let data = [];
                    let name = args[0].toLowerCase();
                    let cmd = commands.get(name) || Array.from(commands.values()).find((v) => v.alias && v.alias.includes(name));
                    if (!cmd || cmd.type === "hide") {
                        return m.reply(COMMAND_NOT_FOUND);
                    }
                    else {
                        data.push(`${COMMAND_INFO_COMMAND} : ${cmd.name.replace(/^\w/, (c) => c.toUpperCase())}`);
                    }
                    if (cmd.alias)
                        data.push(`${COMMAND_INFO_ALIAS} : ${cmd.alias.join(", ")}`);
                    if (cmd.cool)
                        data.push(`${COMMAND_INFO_COOLDOWN}: ${cmd.cool}`);
                    if (cmd.desc)
                        data.push(`${COMMAND_INFO_DESCRIPTION} : ${cmd.desc}`);
                    if (cmd.usage)
                        data.push(`${COMMAND_INFO_EXAMPLE} : ${cmd.usage.replace(/%prefix/gi, prefix).replace(/%command/gi, cmd.name).replace(/%text/gi, text)}`);
                    var buttonss = [
                        { buttonId: `${prefix}help`, buttonText: { displayText: HELP_BUTTON_TEXT }, type: 1 }
                    ];
                    let buth = {
                        text: `${COMMAND_INFO_TITLE}\n\n${data.join("\n")}`,
                        footer: BOT_NAME_PLACEHOLDER,
                        buttons: buttonss,
                        headerType: 1
                    };
                    return Yaka.sendMessage(m.from, buth, { quoted: m });
                }
                else {
                    let textHelpMenu = `${HELP_MENU_HEADER}\n`;
                    textHelpMenu += `${HELP_MENU_GREETING(greeting, pushName)}\n`;
                    textHelpMenu += `${HELP_MENU_HEADER}\n`;
                    textHelpMenu += `${HELP_MENU_BOT_INFO(BOT_NAME_PLACEHOLDER)}\n`;
                    textHelpMenu += `${HELP_MENU_HEADER}\n`;
                    textHelpMenu += `${HELP_MENU_COMMAND_LIST_PROMPT(prefix)}\n`;
                    textHelpMenu += `${HELP_MENU_HEADER}\n`;
                    await Yaka.sendMessage(m.from, {
                        video: { url: ZERO_TWO_DANCE_VIDEO_URL },
                        caption: textHelpMenu,
                        gifPlayback: true
                    }, { quoted: m });
                }
            }
        }
    ];
}
export default SaludoPlugin;
//# sourceMappingURL=saludo.js.map