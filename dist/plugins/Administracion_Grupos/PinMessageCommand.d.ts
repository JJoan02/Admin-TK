export default PinMessageCommand;
declare class PinMessageCommand {
    constructor(logger: any);
    isGroupOnly: boolean;
    adminOnly: boolean;
    botAdmin: boolean;
    content: any;
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=PinMessageCommand.d.ts.map