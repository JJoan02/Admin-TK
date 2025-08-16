declare const handler: {
    (m: any, { conn, text, command, args, usedPrefix }: {
        conn: any;
        text: any;
        command: any;
        args: any;
        usedPrefix: any;
    }): Promise<any>;
    help: string[];
    tags: string[];
    register: boolean;
    command: string[];
};
export default handler;
//# sourceMappingURL=util-simi.d.ts.map