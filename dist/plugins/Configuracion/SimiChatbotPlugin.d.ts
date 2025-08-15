export default SimiChatbotPlugin;
declare class SimiChatbotPlugin {
    constructor(dbService: any, config: any, logger: any);
    before(m: any, { conn }: {
        conn: any;
    }): Promise<boolean>;
    #private;
}
//# sourceMappingURL=SimiChatbotPlugin.d.ts.map