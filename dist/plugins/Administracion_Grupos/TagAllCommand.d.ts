export default TagAllCommand;
declare class TagAllCommand {
    constructor(dbService: any, logger: any);
    isGroupOnly: boolean;
    adminOnly: boolean;
    commands: string[];
    content: any;
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=TagAllCommand.d.ts.map