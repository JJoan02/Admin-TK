declare const handler: {
    (m: any, { conn, isROwner, usedPrefix, command, text }: {
        conn: any;
        isROwner: any;
        usedPrefix: any;
        command: any;
        text: any;
    }): Promise<any>;
    help: string[];
    tags: string[];
    command: string[];
    rowner: boolean;
};
export default handler;
//# sourceMappingURL=owner-getplugin.d.ts.map