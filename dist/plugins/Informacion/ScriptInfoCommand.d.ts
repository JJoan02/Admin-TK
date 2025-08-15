export default ScriptInfoCommand;
declare class ScriptInfoCommand {
    constructor(logger: any, config: any);
    commands: string[];
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=ScriptInfoCommand.d.ts.map