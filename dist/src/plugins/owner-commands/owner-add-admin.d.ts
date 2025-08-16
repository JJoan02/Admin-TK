declare const handler: {
    (m: any, { conn, text, args, usedPrefix, command }: {
        conn: any;
        text: any;
        args: any;
        usedPrefix: any;
        command: any;
    }): Promise<any>;
    command: string[];
    rowner: boolean;
};
export default handler;
//# sourceMappingURL=owner-add-admin.d.ts.map