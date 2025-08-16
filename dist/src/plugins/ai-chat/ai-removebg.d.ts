declare const handler: {
    (m: any, { conn, text, usedPrefix, command }: {
        conn: any;
        text: any;
        usedPrefix: any;
        command: any;
    }): Promise<void>;
    tags: string[];
    help: string[];
    command: string[];
};
export default handler;
//# sourceMappingURL=ai-removebg.d.ts.map