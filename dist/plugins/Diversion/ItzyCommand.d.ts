export default ItzyCommand;
declare class ItzyCommand {
    constructor(logger: any);
    commands: string[];
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=ItzyCommand.d.ts.map