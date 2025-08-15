export default KpopCommand;
declare class KpopCommand {
    constructor(logger: any);
    commands: string[];
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=KpopCommand.d.ts.map