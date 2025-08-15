export default QRCodeCommand;
declare class QRCodeCommand {
    constructor(logger: any);
    commands: string[];
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=QRCodeCommand.d.ts.map