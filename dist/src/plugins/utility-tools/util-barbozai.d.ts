declare const handler: {
    (m: any, { conn, args }: {
        conn: any;
        args: any;
    }): Promise<any>;
    command: string[];
    help: string[];
    tags: string[];
};
export default handler;
//# sourceMappingURL=util-barbozai.d.ts.map