export default PollCommand;
declare class PollCommand {
    constructor(logger: any);
    isGroupOnly: boolean;
    content: any;
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=PollCommand.d.ts.map