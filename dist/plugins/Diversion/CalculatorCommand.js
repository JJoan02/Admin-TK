import { Command } from '../../core/CommandBus.js';
import { funMessages } from '../content/fun-content.js';
export class CalculatorCommand extends Command {
    constructor() {
        super();
        this.name = 'calculator';
        this.description = 'Calcula porcentajes divertidos.';
        this.commands = [
            'gay2', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta',
            'manco', 'manca', 'rata', 'prostituto', 'prostituta'
        ];
        this.tags = ['fun'];
        this.help = this.commands.map((cmd) => `${cmd} @user`);
    }
    async execute(context) {
        const { conn, m, command, text } = context;
        if (!text) {
            return m.reply(funMessages.calculator.tagPerson);
        }
        const percentage = (500).getRandom();
        let replyMessage = '';
        switch (command) {
            case 'gay2':
                replyMessage = funMessages.calculator.gay(text, percentage);
                break;
            case 'lesbiana':
                replyMessage = funMessages.calculator.lesbiana(text, percentage);
                break;
            case 'pajero':
                replyMessage = funMessages.calculator.pajero(text, percentage);
                break;
            case 'pajera':
                replyMessage = funMessages.calculator.pajera(text, percentage);
                break;
            case 'puto':
                replyMessage = funMessages.calculator.puto(text, percentage);
                break;
            case 'puta':
                replyMessage = funMessages.calculator.puta(text, percentage);
                break;
            case 'manco':
                replyMessage = funMessages.calculator.manco(text, percentage);
                break;
            case 'manca':
                replyMessage = funMessages.calculator.manca(text, percentage);
                break;
            case 'rata':
                replyMessage = funMessages.calculator.rata(text, percentage);
                break;
            case 'prostituto':
                replyMessage = funMessages.calculator.prostituto(text, percentage);
                break;
            case 'prostituta':
                replyMessage = funMessages.calculator.prostituta(text, percentage);
                break;
            default:
                return;
        }
        m.reply(replyMessage, m, m.mentionedJid ? { mentions: m.mentionedJid } : {});
    }
}
//# sourceMappingURL=CalculatorCommand.js.map