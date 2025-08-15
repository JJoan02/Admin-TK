import { Command } from '../../core/Command.js';
import { anonymousChatInfoMessages } from '../../lib/informacion-content.js';
class AnonymousChatInfoCommand extends Command {
    constructor() {
        super('chatanonimo', 'Muestra información sobre el chat anónimo.');
        this.commands = ['anonimochat', 'chatanonimo', 'AnonimoChat', 'ChatAnonimo', 'chatanónimo', 'anónimochat', 'anonimoch'];
    }
    async execute(context) {
        const { m, conn } = context;
        const fkontak = {
            "key": {
                "participants": "0@s.whatsapp.net",
                "remoteJid": "status@broadcast",
                "fromMe": false,
                "id": "Halo"
            },
            "message": {
                "contactMessage": {
                    "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            },
            "participant": "0@s.whatsapp.net"
        };
        await conn.sendButton(m.chat, anonymousChatInfoMessages.info, global.wm, global.pp, [['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ | 𝘽𝙖𝙘𝙠 𝙩𝙤 𝙈𝙚𝙣𝙪 ☘️', '/menu']], fkontak, m);
    }
}
export default AnonymousChatInfoCommand;
//# sourceMappingURL=AnonymousChatInfoCommand.js.map