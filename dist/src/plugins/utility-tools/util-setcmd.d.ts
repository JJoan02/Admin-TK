declare const handler: {
    (m: any, { conn, text, usedPrefix, command }: {
        conn: any;
        text: any;
        usedPrefix: any;
        command: any;
    }): Promise<void>;
    command: string[];
    rowner: boolean;
};
export default handler;
//# sourceMappingURL=util-setcmd.d.ts.map