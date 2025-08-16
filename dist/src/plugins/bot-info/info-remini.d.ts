declare const handler: {
    (m: any, { conn, usedPrefix, command }: {
        conn: any;
        usedPrefix: any;
        command: any;
    }): Promise<any>;
    help: string[];
    tags: string[];
    command: string[];
    register: boolean;
};
export default handler;
//# sourceMappingURL=info-remini.d.ts.map