export default ConfigCommand;
declare class ConfigCommand {
    constructor(dbService: any, config: any, logger: any);
    commands: string[];
    execute(context: any): Promise<boolean | undefined>;
    #private;
}
//# sourceMappingURL=ConfigCommand.d.ts.map