import { Command } from '../../core/CommandBus.js';
import { groupSettingsMessages } from '../content/group-settings-content.js';
export class GroupSettingsCommand extends Command {
    constructor() {
        super();
        this.name = 'group';
        this.description = 'Abre o cierra el grupo.';
        this.commands = ['group', 'grupo'];
        this.tags = ['group'];
        this.help = ['group <open/close>'];
        this.admin = true;
        this.botAdmin = true;
        this.group = true;
    }
    async execute(context) {
        const { conn, m, args, usedPrefix, command } = context;
        let isClose = {
            'open': 'not_announcement',
            'close': 'announcement',
            'abierto': 'not_announcement',
            'cerrado': 'announcement',
            'abrir': 'not_announcement',
            'cerrar': 'announcement',
        }[(args[0] || '').toLowerCase()];
        if (isClose === undefined) {
            return m.reply(groupSettingsMessages.groupOptions(usedPrefix, command));
        }
        await conn.groupSettingUpdate(m.chat, isClose);
        if (isClose === 'not_announcement') {
            m.reply(groupSettingsMessages.groupOpen);
        }
        else if (isClose === 'announcement') {
            m.reply(groupSettingsMessages.groupClose);
        }
    }
}
//# sourceMappingURL=GroupSettingsCommand.js.map