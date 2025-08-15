export default InstallBotCommand;
declare class InstallBotCommand {
    constructor(config: any);
    commands: string[];
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=InstallBotCommand.d.ts.map