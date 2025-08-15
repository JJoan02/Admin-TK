export default CharacterAICommand;
declare class CharacterAICommand {
    constructor(logger: any);
    commands: string[];
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=CharacterAICommand.d.ts.map