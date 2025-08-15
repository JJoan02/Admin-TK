export default WarnCommand;
declare class WarnCommand {
    constructor(dbService: any, config: any, logger: any);
    isGroupOnly: boolean;
    adminOnly: boolean;
    botAdmin: boolean;
    content: any;
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=WarnCommand.d.ts.map