declare const handler: {
    (m: any, { text, conn, usedPrefix, command }: {
        text: any;
        conn: any;
        usedPrefix: any;
        command: any;
    }): Promise<void>;
    command: string[];
    rowner: boolean;
};
export default handler;
//# sourceMappingURL=ai-block.d.ts.map