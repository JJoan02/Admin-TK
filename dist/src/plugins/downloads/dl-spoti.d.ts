declare const handler: {
    (m: any, { conn, command, args, text, usedPrefix }: {
        conn: any;
        command: any;
        args: any;
        text: any;
        usedPrefix: any;
    }): Promise<void>;
    tags: string[];
    command: string[];
};
export default handler;
//# sourceMappingURL=dl-spoti.d.ts.map