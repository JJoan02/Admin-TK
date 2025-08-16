declare const handler: {
    (m: any, { conn, args, usedPrefix, command }: {
        conn: any;
        args: any;
        usedPrefix: any;
        command: any;
    }): Promise<any>;
    help: string[];
    tags: string[];
    command: string[];
};
export default handler;
//# sourceMappingURL=ai-qc.d.ts.map