declare const handler: {
    (m: any, { conn, text, usedPrefix, command }: {
        conn: any;
        text: any;
        usedPrefix: any;
        command: any;
    }): Promise<void>;
    help: string[];
    tags: string[];
    command: string[];
    rowner: boolean;
};
export default handler;
//# sourceMappingURL=ai-prefix.d.ts.map