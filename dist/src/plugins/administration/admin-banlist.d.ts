declare const handler: {
    (m: any, { conn, isOwner }: {
        conn: any;
        isOwner: any;
    }): Promise<void>;
    command: string[];
    rowner: boolean;
};
export default handler;
//# sourceMappingURL=admin-banlist.d.ts.map