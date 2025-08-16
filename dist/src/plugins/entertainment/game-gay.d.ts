declare const handler: {
    (m: any, { conn, command, text, usedPrefix }: {
        conn: any;
        command: any;
        text: any;
        usedPrefix: any;
    }): Promise<any>;
    help: string[];
    tags: string[];
    register: boolean;
    group: boolean;
    command: string[];
};
export default handler;
//# sourceMappingURL=game-gay.d.ts.map