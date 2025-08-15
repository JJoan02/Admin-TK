export default SpamCommand;
declare class SpamCommand {
    constructor(logger: any);
    commands: string[];
    group: boolean;
    premium: boolean;
    register: boolean;
    level: number;
    limit: number;
    execute(context: any): Promise<void>;
    #private;
}
//# sourceMappingURL=SpamCommand.d.ts.map