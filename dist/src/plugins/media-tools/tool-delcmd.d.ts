declare const handler: {
    (m: any, { conn, usedPrefix, text, command }: {
        conn: any;
        usedPrefix: any;
        text: any;
        command: any;
    }): Promise<void>;
    command: string[];
    rowner: boolean;
};
export default handler;
//# sourceMappingURL=tool-delcmd.d.ts.map