declare const handler: {
    (m: any, { conn, isOwner }: {
        conn: any;
        isOwner: any;
    }): Promise<void>;
    help: string[];
    tags: string[];
    command: string[];
    owner: boolean;
    run(conn: any): Promise<void>;
};
export default handler;
//# sourceMappingURL=info-canal.d.ts.map