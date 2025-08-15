import { Command } from '../../core/Command.js';
import { creatorInfoMessages } from '../../lib/informacion-content.js';
class CreatorInfoCommand extends Command {
    #config;
    constructor(config) {
        super('creator', 'Muestra la información de contacto del creador.');
        this.#config = config;
        this.commands = ['owner', 'creator', 'creador', 'dueño'];
    }
    async execute(context) {
        const { m, conn } = context;
        const creator = this.#config.creator;
        const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:WhatsApp;  ${creator.name}\nNICKNAME:👤 ${creator.name}\nORG: ${creator.name}\nTITLE:soft\nitem1.TEL;waid=${creator.whatsapp}:+${creator.whatsapp}\nitem1.X-ABLabel:📞 WhatsApp Owner\nitem2.URL:${creator.github}\nitem2.X-ABLabel:💬 More\nitem3.EMAIL;type=INTERNET: ${creator.email}\nitem3.X-ABLabel:💌 Correo soporte\nitem4.ADR:;;${creator.location};;;;\nitem4.X-ABADR:💬 More\nitem4.X-ABLabel: Localización 🫧\nBDAY;value=date:🤍 ${creator.birthdate}\nEND:VCARD`;
        await conn.sendMessage(m.chat, {
            contacts: {
                displayName: "Creador",
                contacts: [{ vcard }]
            }
        }, { quoted: m });
        const username = conn.getName(m.sender);
        const txt = creatorInfoMessages.greeting(username);
        await conn.sendMessage(m.chat, {
            text: txt,
            footer: creatorInfoMessages.footer,
            buttons: [
                {
                    buttonId: ".menu",
                    buttonText: {
                        displayText: creatorInfoMessages.menuButton
                    },
                    type: 1
                }
            ],
            viewOnce: true,
            headerType: 1
        }, { quoted: m });
    }
}
export default CreatorInfoCommand;
//# sourceMappingURL=CreatorInfoCommand.js.map