declare const handler: {
    (m: any, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }: {
        conn: any;
        usedPrefix: any;
        command: any;
        args: any;
        isOwner: any;
        isAdmin: any;
        isROwner: any;
    }): Promise<any>;
    help: string[];
    tags: string[];
    command: string[];
};
export default handler;
//# sourceMappingURL=admin-enable.d.ts.map