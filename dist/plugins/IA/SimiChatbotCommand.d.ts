export default SimiChatbotCommand;
declare class SimiChatbotCommand {
    constructor(logger: any, config: any);
    commands: string[];
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=SimiChatbotCommand.d.ts.map