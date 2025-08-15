export default UnbanBotCommand;
declare class UnbanBotCommand {
    constructor(dbService: any, config: any, logger: any);
    commands: string[];
    isGroupOnly: boolean;
    adminOnly: boolean;
    ownerOnly: boolean;
    content: any;
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=UnbanBotCommand.d.ts.map