export default SimpCardCommand;
declare class SimpCardCommand {
    constructor(logger: any);
    commands: string[];
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=SimpCardCommand.d.ts.map