export default CatCommand;
declare class CatCommand {
    constructor(logger: any);
    commands: string[];
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=CatCommand.d.ts.map