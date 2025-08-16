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
    group: boolean;
    rowner: boolean;
};
export default handler;
//# sourceMappingURL=game-remove.d.ts.map