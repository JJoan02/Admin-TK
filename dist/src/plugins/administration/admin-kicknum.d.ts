declare const handler: {
    (m: any, { conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin }: {
        conn: any;
        args: any;
        groupMetadata: any;
        participants: any;
        usedPrefix: any;
        command: any;
        isBotAdmin: any;
        isSuperAdmin: any;
    }): Promise<any>;
    help: string[];
    tags: string[];
    command: string[];
    group: boolean;
    botAdmin: boolean;
    admin: boolean;
    fail: null;
};
export default handler;
//# sourceMappingURL=admin-kicknum.d.ts.map