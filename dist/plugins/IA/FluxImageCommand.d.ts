export default FluxImageCommand;
declare class FluxImageCommand {
    constructor(logger: any);
    commands: string[];
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=FluxImageCommand.d.ts.map