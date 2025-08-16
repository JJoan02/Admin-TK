declare const handler: {
    (m: any, { conn, usedPrefix }: {
        conn: any;
        usedPrefix: any;
    }): Promise<void>;
    help: string[];
    tags: string[];
    command: string[];
    register: boolean;
};
export default handler;
//# sourceMappingURL=game-infobot.d.ts.map