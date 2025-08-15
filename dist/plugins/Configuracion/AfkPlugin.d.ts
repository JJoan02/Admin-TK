export default AfkPlugin;
declare class AfkPlugin {
    constructor(dbService: any, logger: any);
    before(m: any, { conn }: {
        conn: any;
    }): Promise<boolean>;
    #private;
}
//# sourceMappingURL=AfkPlugin.d.ts.map