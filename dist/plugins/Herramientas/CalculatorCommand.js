import { Command } from '../../core/Command.js';
import { evaluate } from 'mathjs';
import { calculatorMessages } from '../../lib/herramientas-content.js';
class CalculatorCommand extends Command {
    #logger;
    constructor(logger) {
        super('calc', 'Realiza cálculos matemáticos. Uso: !calc <expresión>');
        this.#logger = logger;
        this.commands = ['calc', 'calculate', 'calculator', 'kalk', 'kalkulator', 'cal', 'calcular', 'calculadora'];
    }
    async execute(context) {
        const { m, conn, text } = context;
        if (!text) {
            await conn.reply(m.chat, calculatorMessages.noExpression, m);
            return;
        }
        const cleanedText = text
            .replace(/[^0-9\-\+\*\/\(\)\s\.\,eEπpiPI]/g, '')
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/π|pi/gi, 'pi')
            .replace(/e/gi, 'e');
        if (!cleanedText) {
            await conn.reply(m.chat, calculatorMessages.invalidFormat, m);
            return;
        }
        try {
            await m.react(global.rwait);
            const result = evaluate(cleanedText);
            if (typeof result === 'function') {
                throw new Error('Expresión inválida.');
            }
            await conn.reply(m.chat, calculatorMessages.result(text, result), m);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al calcular: ${e.message}`);
            await conn.reply(m.chat, calculatorMessages.invalidFormat, m);
            await m.react('✖️');
        }
    }
}
export default CalculatorCommand;
//# sourceMappingURL=CalculatorCommand.js.map