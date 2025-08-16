declare const handler: {
    (m: any, { conn, args, __dirname, usedPrefix, command }: {
        conn: any;
        args: any;
        __dirname: any;
        usedPrefix: any;
        command: any;
    }): Promise<void>;
    help: string[];
    tags: string[];
    register: boolean;
    command: string[];
};
export default handler;
//# sourceMappingURL=owner-bass.d.ts.map