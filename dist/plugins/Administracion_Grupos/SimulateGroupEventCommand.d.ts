export default SimulateGroupEventCommand;
declare class SimulateGroupEventCommand {
    constructor(logger: any);
    isGroupOnly: boolean;
    adminOnly: boolean;
    content: any;
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=SimulateGroupEventCommand.d.ts.map