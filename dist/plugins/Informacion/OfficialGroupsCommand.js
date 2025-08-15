import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
import { officialGroupsMessages } from '../../lib/informacion-content.js';
class OfficialGroupsCommand extends Command {
    #config;
    constructor(config) {
        super('grupos', 'Muestra los grupos y canales oficiales del bot.');
        this.#config = config;
        this.commands = ['grupos', 'linkgc', 'gruposadmintk', 'admintkgrupos', 'gruposdeadmintk', 'groupofc', 'grupostk', 'grupogtk', 'grouptk'];
    }
    async execute(context) {
        const { m, conn } = context;
        const officialGroups = this.#config.officialGroups;
        const img = await (await fetch(`https://i.ibb.co/1djcb0T/file.jpg`)).buffer();
        const more = String.fromCharCode(8206);
        const readMore = more.repeat(4001);
        let str = `${officialGroupsMessages.welcome}\n`;
        str += `${officialGroupsMessages.genesisUltra}${officialGroups.genesisUltra}\n\n`;
        str += `*─ׄ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׄ*\n\n`;
        str += `➠ Enlace anulado? entre aquí! \n\n`;
        str += `${officialGroupsMessages.genesisChannel}${officialGroups.genesisChannel}\n\n`;
        str += `${officialGroupsMessages.tkHostChannel}${officialGroups.tkHostChannel}\n\n`;
        str += `${officialGroupsMessages.supportGroup}${officialGroups.supportGroup}\n\n`;
        str += `${officialGroupsMessages.group1}${officialGroups.group1}\n\n`;
        str += `${officialGroupsMessages.group2}${officialGroups.group2}\n\n`;
        str += `${officialGroupsMessages.collabHeader}\n`;
        str += `${officialGroupsMessages.collab1}${officialGroups.collabGroup1}\n\n`;
        str += `${officialGroupsMessages.collab2}${officialGroups.collabGroup2}\n\n`;
        str += `${officialGroupsMessages.collab3}${officialGroups.collabGroup3}\n\n`;
        str += `${officialGroupsMessages.collab4}${officialGroups.collabGroup4}\n\n`;
        str += `${officialGroupsMessages.atmmGroup}${officialGroups.atmmGroup}\n\n`;
        str += officialGroupsMessages.rules;
        await conn.sendButton(m.chat, str, officialGroupsMessages.footer(global.asistencia, global.AdminTK_wm), img, [
            ['𝘾𝙪𝙚𝙣𝙩𝙖𝙨 𝙊𝙛𝙞𝙘𝙞𝙖𝙡𝙚𝙨 | 𝘼𝙘𝙘𝙤𝙪𝙣𝙩𝙨 ✅', '.cuentasgb'],
            ['🎁 𝘿𝙤𝙣𝙖𝙧 | 𝘿𝙤𝙣𝙖𝙩𝙚', '.donar'],
            ['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖 𝙈𝙚𝙣𝙪́ | 𝘽𝙖𝙘𝙠 𝙩𝙤 𝙈𝙚𝙣𝙪 ☘️', '/menu']
        ], null, [
            ['Admin-TK', this.#config.officialAccounts.github]
        ], global.AdminTK_fkontak);
    }
}
export default OfficialGroupsCommand;
//# sourceMappingURL=OfficialGroupsCommand.js.map