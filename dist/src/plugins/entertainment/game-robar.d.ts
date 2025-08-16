declare const handler: {
    (m: any, { conn, usedPrefix, command }: {
        conn: any;
        usedPrefix: any;
        command: any;
    }): Promise<any>;
    help: string[];
    tags: string[];
    command: string[];
};
export default handler;
//# sourceMappingURL=game-robar.d.ts.map