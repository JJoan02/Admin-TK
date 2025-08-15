export = Database;
declare class Database {
    getSession: (sessionId: string) => Promise<{
        sessionId: string;
        session: string;
    }>;
    session: any;
}
//# sourceMappingURL=Database.d.ts.map