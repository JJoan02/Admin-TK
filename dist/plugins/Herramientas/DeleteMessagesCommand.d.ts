export default DeleteMessagesCommand;
declare class DeleteMessagesCommand {
    constructor(logger: any);
    commands: string[];
    groupOnly: boolean;
    adminOnly: boolean;
    botAdmin: boolean;
    execute(context: any): Promise<any>;
    #private;
}
//# sourceMappingURL=DeleteMessagesCommand.d.ts.map