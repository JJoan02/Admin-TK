import { Command } from '../../core/CommandBus.js';
declare global {
    interface Number {
        getRandom(): number;
    }
}
export declare class CalculatorCommand extends Command {
    constructor();
    execute(context: any): Promise<any>;
}
//# sourceMappingURL=CalculatorCommand.d.ts.map