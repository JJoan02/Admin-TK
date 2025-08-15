export default NetworkSpeedTestCommand;
declare class NetworkSpeedTestCommand {
    constructor(logger: any);
    commands: string[];
    execute(context: any): Promise<void>;
    catch(e: any): void;
    #private;
}
//# sourceMappingURL=NetworkSpeedTestCommand.d.ts.map