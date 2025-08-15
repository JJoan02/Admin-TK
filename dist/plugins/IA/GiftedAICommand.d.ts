export default GiftedAICommand;
declare class GiftedAICommand {
    constructor(logger: any, config: any);
    commands: string[];
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=GiftedAICommand.d.ts.map