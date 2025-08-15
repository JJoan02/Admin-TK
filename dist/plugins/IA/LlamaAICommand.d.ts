export default LlamaAICommand;
declare class LlamaAICommand {
    constructor(logger: any, config: any);
    commands: string[];
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=LlamaAICommand.d.ts.map