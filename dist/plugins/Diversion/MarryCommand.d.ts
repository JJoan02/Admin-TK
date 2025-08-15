export default MarryCommand;
declare class MarryCommand {
    static before(m: any, conn: any, dbService: any): Promise<any>;
    constructor(dbService: any, logger: any);
    commands: string[];
    groupOnly: boolean;
    execute(context: any): Promise<any>;
    #private;
}
//# sourceMappingURL=MarryCommand.d.ts.map