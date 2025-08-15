export default MorseCodeCommand;
declare class MorseCodeCommand {
    constructor(logger: any);
    commands: string[];
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=MorseCodeCommand.d.ts.map