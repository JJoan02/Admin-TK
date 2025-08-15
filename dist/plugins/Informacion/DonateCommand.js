import { Command } from '../../core/Command.js';
import { donateMessages } from '../../lib/informacion-content.js';
class DonateCommand extends Command {
    #config;
    constructor(config) {
        super('donate', 'Muestra información sobre cómo donar al bot.');
        this.#config = config;
        this.commands = ['donate', 'donasi', 'donar', 'apoyar', 'paypal', 'donating'];
    }
    async execute(context) {
        const { m, conn } = context;
        const paypalLink = this.#config.donations.paypal;
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
        const str = `💖 𝙃𝙤𝙡𝙖!! 𝘼𝙜𝙧𝙖𝙙𝙚𝙯𝙘𝙤 𝙨𝙞 𝙢𝙚 𝘼𝙥𝙤𝙮𝙖𝙨 𝘿𝙤𝙣𝙖𝙣𝙙𝙤. 🎁 𝙈𝙚 𝙖𝙜𝙧𝙖𝙙𝙖 𝙚𝙡 𝙏𝙧𝙖𝙗𝙖𝙟𝙤 𝙦𝙪𝙚 𝙝𝙚 𝙇𝙤𝙜𝙧𝙖𝙙𝙤 𝙮 𝙡𝙤 𝘾𝙤𝙢𝙥𝙖𝙧𝙩𝙤 𝙘𝙤𝙣 𝙐𝙨𝙩𝙚𝙙𝙚𝙨. 𝙂𝙧𝙖𝙘𝙞𝙖𝙨!\n💖 𝙃𝙚𝙡𝙡𝙤!! 𝙄 𝙖𝙥𝙥𝙧𝙚𝙘𝙞𝙖𝙩𝙚 𝙞𝙛 𝙮𝙤𝙪 𝙨𝙪𝙥𝙥𝙤𝙧𝙩 𝙢𝙚 𝙗𝙮 𝙙𝙤𝙣𝙖𝙩𝙞𝙣𝙜. 🎁 𝙄 𝙡𝙞𝙠𝙚 𝙩𝙝𝙚 work 𝙄 𝙝𝙖𝙫𝙚 𝙖𝙘𝙝𝙞𝙚𝙫𝙚𝙙 𝙖𝙣𝙙 𝙨𝙝𝙖𝙧𝙚 𝙬𝙞𝙩𝙝 𝙮𝙤𝙪. 𝙏𝙝𝙖𝙣𝙠 𝙮𝙤𝙪!\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n𝙋𝙖𝙮𝙋𝙖l - 𝙂𝙖𝙩𝙖 𝘿𝙞𝙤𝙨\n*${paypalLink}*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈`;
        await conn.sendButton(m.chat, str, donateMessages.footer(global.asistencia, global.wm), './media/menus/Menu4paypal.jpg', [
            ['𝙂𝙧𝙪𝙥𝙤𝙨 𝙊𝙛𝙞𝙘𝙞𝙖𝙡𝙚𝙨 | 𝙂𝙧𝙤𝙪𝙥𝙨 🔰', '.grupos'],
            ['𝘾𝙧𝙚𝙖𝙙𝙤𝙧𝙖 | 𝘾𝙧𝙚𝙖𝙩𝙤𝙧 💗', '#owner'],
            ['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ | 𝘽𝙖𝙘𝙠 𝙩𝙤 𝙈𝙚𝙣𝙪 ☘️', '/menu']
        ], null, [
            ['🎁 𝘿𝙤𝙣𝙖𝙧 | 𝘿𝙤𝙣𝙖𝙩𝙚', paypalLink]
        ], fkontak);
    }
}
export default DonateCommand;
//# sourceMappingURL=DonateCommand.js.map