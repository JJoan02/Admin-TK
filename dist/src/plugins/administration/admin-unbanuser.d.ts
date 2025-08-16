declare const handler: {
    (m: any, { conn, args, text, usedPrefix, command }: {
        conn: any;
        args: any;
        text: any;
        usedPrefix: any;
        command: any;
    }): Promise<void>;
    help: string[];
    command: string[];
    tags: string[];
    rowner: boolean;
    group: boolean;
};
export default handler;
//# sourceMappingURL=admin-unbanuser.d.ts.map