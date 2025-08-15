export default FakeReplyCommand;
declare class FakeReplyCommand {
    constructor(logger: any);
    commands: string[];
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=FakeReplyCommand.d.ts.map