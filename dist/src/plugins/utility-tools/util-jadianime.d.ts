declare const handler: {
    (m: any, { conn, text, args, usedPrefix, command }: {
        conn: any;
        text: any;
        args: any;
        usedPrefix: any;
        command: any;
    }): Promise<void>;
    help: string[];
    tags: string[];
    register: boolean;
    command: string[];
};
export default handler;
//# sourceMappingURL=util-jadianime.d.ts.map