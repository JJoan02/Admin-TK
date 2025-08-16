declare const handler: {
    (m: any, { conn, usedPrefix, command, text }: {
        conn: any;
        usedPrefix: any;
        command: any;
        text: any;
    }): Promise<any>;
    help: string[];
    tags: string[];
    command: string[];
    group: boolean;
};
export default handler;
//# sourceMappingURL=ai-huevo.d.ts.map