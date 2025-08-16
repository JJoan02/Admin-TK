export declare class SessionManager {
    #private;
    constructor(logger: any);
    listSessions(): Promise<never[]>;
    loadAuth(sessionId: any): Promise<{
        state: any;
        saveCreds: any;
    }>;
    deleteSession(sessionId: any): Promise<void>;
}
export default SessionManager;
//# sourceMappingURL=SessionManager.d.ts.map