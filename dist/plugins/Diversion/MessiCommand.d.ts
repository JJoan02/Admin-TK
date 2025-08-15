export default MessiCommand;
declare class MessiCommand {
    constructor(logger: any);
    commands: string[];
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=MessiCommand.d.ts.map