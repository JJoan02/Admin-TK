export default RemoveWarningCommand;
declare class RemoveWarningCommand {
    constructor(dbService: any, config: any, logger: any);
    isGroupOnly: boolean;
    adminOnly: boolean;
    botAdmin: boolean;
    content: any;
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=RemoveWarningCommand.d.ts.map