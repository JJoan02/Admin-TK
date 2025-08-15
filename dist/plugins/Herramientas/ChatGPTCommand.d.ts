export default ChatGPTCommand;
declare class ChatGPTCommand {
    constructor(logger: any, config: any);
    commands: string[];
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=ChatGPTCommand.d.ts.map