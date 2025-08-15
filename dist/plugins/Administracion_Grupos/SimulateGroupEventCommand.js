import { Command } from '../../core/Command.js';
import { adminGroupsContent } from '../../content/administracion-grupos-content.js';
class SimulateGroupEventCommand extends Command {
    #logger;
    constructor(logger) {
        super('simulate', adminGroupsContent.simulateGroupEvent.description);
        this.#logger = logger;
        this.isGroupOnly = true;
        this.adminOnly = true;
        this.content = adminGroupsContent.simulateGroupEvent;
    }
    async execute(context) {
        const { m, conn, args, text, usedPrefix, command } = context;
        if (!args[0]) {
            await m.reply(this.content.noEvent(global.mid, usedPrefix, command));
            return;
        }
        const event = args[0].toLowerCase();
        let action = false;
        switch (event) {
            case 'add':
            case 'invite':
            case 'welcome':
            case 'bienvenida':
                action = 'add';
                break;
            case 'bye':
            case 'kick':
            case 'leave':
            case 'remove':
            case 'sacar':
                action = 'remove';
                break;
            case 'promote':
            case 'daradmin':
            case 'darpoder':
                action = 'promote';
                break;
            case 'demote':
            case 'quitaradmin':
            case 'quitarpoder':
                action = 'demote';
                break;
            default:
                await conn.reply(m.chat, this.content.invalidEvent, m);
                return;
        }
        let mentions = text.replace(event, '').trimStart();
        let who = mentions ? conn.parseMention(mentions) : [];
        let part = who.length ? who : [m.sender];
        try {
            await conn.reply(m.chat, this.content.simulating(event), m);
            await conn.groupParticipantsUpdate({
                id: m.chat,
                participants: part,
                action: action,
            });
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al simular evento de grupo: ${e.message}`);
            await conn.reply(m.chat, this.content.error, m);
            await m.react('✖️');
        }
    }
}
export default SimulateGroupEventCommand;
//# sourceMappingURL=SimulateGroupEventCommand.js.map