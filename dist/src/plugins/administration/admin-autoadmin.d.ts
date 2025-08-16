declare const handler: {
    (m: any, { conn, isAdmin, groupMetadata }: {
        conn: any;
        isAdmin: any;
        groupMetadata: any;
    }): Promise<any>;
    tags: string[];
    help: string[];
    command: string[];
    rowner: boolean;
    group: boolean;
    botAdmin: boolean;
};
export default handler;
//# sourceMappingURL=admin-autoadmin.d.ts.map