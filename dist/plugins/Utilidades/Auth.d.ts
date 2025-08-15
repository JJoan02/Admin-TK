export = Authenication;
declare class Authenication {
    constructor(sessionId: string);
    sessionId: string;
    getAuthFromDatabase: () => Promise<{
        state: {
            creds: any;
            keys: {
                get: (type: any, ids: any) => any;
                set: (data: any) => void;
            };
        };
        saveState: () => Promise<void>;
        clearState: () => Promise<void>;
    }>;
    private DB;
    private KEY_MAP;
}
//# sourceMappingURL=Auth.d.ts.map