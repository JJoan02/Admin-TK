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
    register: boolean;
};
export default handler;
//# sourceMappingURL=dl-ytmp3.d.ts.map