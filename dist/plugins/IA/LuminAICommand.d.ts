export default LuminAICommand;
declare class LuminAICommand {
    constructor(logger: any);
    commands: string[];
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=LuminAICommand.d.ts.map