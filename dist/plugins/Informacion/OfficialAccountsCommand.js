import { Command } from '../../core/Command.js';
import { officialAccountsMessages } from '../../lib/informacion-content.js';
class OfficialAccountsCommand extends Command {
    #config;
    constructor(config) {
        super('cuentasoficiales', 'Muestra las cuentas oficiales del bot.');
        this.#config = config;
        this.commands = ['cuentasoficiales', 'gataig', 'cuentasgb', 'cuentagb', 'accounts', 'gataaccounts', 'account', 'iggata', 'cuentasdegata', 'cuentasdegatabot', 'cuentagatabot', 'cuentasgatabot'];
    }
    async execute(context) {
        const { m, conn } = context;
        const officialAccounts = this.#config.officialAccounts;
        const fkontak = {
            "key": {
                "participants": "0@s.whatsapp.net",
                "remoteJid": "status@broadcast",
                "fromMe": false,
                "id": "Halo"
            },
            "message": {
                "contactMessage": {
                    "vcard": "BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD"
                }
            },
            "participant": "0@s.whatsapp.net"
        };
        const str = `💙 𝘽𝙄𝙀𝙉𝙑𝙀𝙉𝙄𝘿𝙊(𝘼) 𝘼 𝙇𝘼𝙎 𝘾𝙐𝙀𝙉𝙏𝘼𝙎 𝙊𝙁𝙄𝘾𝙄𝘼𝙇𝙀𝙎\n💜 𝙒𝙀𝙇𝘾𝙊𝙈𝙀 𝙏𝙊 𝙏𝙃𝙀 𝙊𝙁𝙁𝙄𝘾𝙄𝘼𝙇 𝘼𝘾𝘾𝙊𝙐𝙉𝙏𝙎\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n💖 𝙂𝙖𝙩𝙖𝘽𝙤𝙩-𝙈𝘿 🐈\n${global.bot}\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n✅ *GITHUB*\n*${officialAccounts.github}*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n✅ *INSTAGRAM - ASISTENCIA*\n*${officialAccounts.instagram}*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n✅ *YOUTUBE*\n*${officialAccounts.youtube}*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n✅ *FACEBOOK*\n*${officialAccounts.facebook}*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n*Si tienen dudas, sugerencias, o preguntas solo escriban por Instagram.*\n\n*If you have doubts, suggestions or questions just write on Instagram.*`;
        await conn.sendButton(m.chat, str, global.wm, 'https://qu.ax/NqZN.mp4', [
            ['𝙂𝙧𝙪𝙥𝙤𝙨 𝙊𝙛𝙞𝙘𝙞𝙖𝙡𝙚𝙨 | 𝙂𝙧𝙤𝙪𝙥𝙨 🔰', '.grupos'],
            ['𝘾𝙧𝙚𝙖𝙙𝙤𝙧𝙖 | 𝘾𝙧𝙚𝙖𝙩𝙤𝙧 💗', '#owner'],
            ['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ | 𝘽𝙖𝙘𝙠 𝙩𝙤 𝙈𝙚𝙣𝙪 ☘️', '/menu']
        ], null, [
            ['𝙂𝙖𝙩𝙖𝘽𝙤𝙩-𝙈𝘿', officialAccounts.github]
        ], fkontak);
    }
}
export default OfficialAccountsCommand;
//# sourceMappingURL=OfficialAccountsCommand.js.map