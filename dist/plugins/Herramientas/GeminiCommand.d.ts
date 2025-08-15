export default GeminiCommand;
declare class GeminiCommand {
    constructor(logger: any);
    commands: string[];
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=GeminiCommand.d.ts.map