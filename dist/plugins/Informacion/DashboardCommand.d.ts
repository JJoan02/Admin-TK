export default DashboardCommand;
declare class DashboardCommand {
    constructor(dbService: any);
    commands: string[];
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=DashboardCommand.d.ts.map