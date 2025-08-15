export default CalculatorCommand;
declare class CalculatorCommand {
    constructor(logger: any);
    commands: string[];
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=CalculatorCommand.d.ts.map