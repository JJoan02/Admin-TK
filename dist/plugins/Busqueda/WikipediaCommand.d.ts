export default WikipediaCommand;
declare class WikipediaCommand {
    constructor(logger: any);
    commands: string[];
    content: any;
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=WikipediaCommand.d.ts.map