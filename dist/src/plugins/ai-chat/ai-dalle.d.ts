declare const handler: {
    (m: any, { conn, args }: {
        conn: any;
        args: any;
    }): Promise<void>;
    command: string[];
    help: string[];
    tags: string[];
};
export default handler;
//# sourceMappingURL=ai-dalle.d.ts.map