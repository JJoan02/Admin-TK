export default NekoCommand;
declare class NekoCommand {
    constructor(logger: any);
    commands: string[];
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=NekoCommand.d.ts.map