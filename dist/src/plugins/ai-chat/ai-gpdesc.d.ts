declare const handler: {
    (m: any, { conn, args }: {
        conn: any;
        args: any;
    }): Promise<void>;
    help: string[];
    tags: string[];
    command: string[];
    group: boolean;
    admin: boolean;
    botAdmin: boolean;
};
export default handler;
//# sourceMappingURL=ai-gpdesc.d.ts.map