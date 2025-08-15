export default MemeCommand;
declare class MemeCommand {
    constructor(logger: any);
    commands: string[];
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=MemeCommand.d.ts.map