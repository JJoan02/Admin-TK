export default SaveCommand;
declare class SaveCommand {
    constructor(logger: any, dbService: any);
    commands: string[];
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=SaveCommand.d.ts.map