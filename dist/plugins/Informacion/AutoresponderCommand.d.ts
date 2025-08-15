export default AutoresponderCommand;
declare class AutoresponderCommand {
    constructor(dbService: any);
    commands: string[];
    permissions: string[];
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=AutoresponderCommand.d.ts.map