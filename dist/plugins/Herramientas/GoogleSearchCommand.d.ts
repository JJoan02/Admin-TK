export default GoogleSearchCommand;
declare class GoogleSearchCommand {
    constructor(logger: any);
    commands: string[];
    execute(context: any): Promise<void>;
    catch(e: any): void;
    #private;
}
//# sourceMappingURL=GoogleSearchCommand.d.ts.map