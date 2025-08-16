declare const handler: {
    (m: any, { conn, command, args, text, usedPrefix }: {
        conn: any;
        command: any;
        args: any;
        text: any;
        usedPrefix: any;
    }): Promise<any>;
    help: string[];
    tags: string[];
    command: string[];
};
export default handler;
//# sourceMappingURL=dl-play.d.ts.map