declare const handler: {
    (m: any, { conn, usedPrefix, command }: {
        conn: any;
        usedPrefix: any;
        command: any;
    }): Promise<void>;
    help: string[];
    tags: string[];
    register: boolean;
    command: string[];
};
export default handler;
//# sourceMappingURL=tool-tovideo.d.ts.map