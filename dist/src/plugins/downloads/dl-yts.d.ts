declare const handler: {
    (m: any, { conn, text }: {
        conn: any;
        text: any;
    }): Promise<any>;
    command: string[];
    tags: string[];
    help: string[];
    before(m: any, { conn }: {
        conn: any;
    }): Promise<any>;
};
export default handler;
//# sourceMappingURL=dl-yts.d.ts.map