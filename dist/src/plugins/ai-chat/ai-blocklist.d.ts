declare const handler: {
    (m: any, { conn }: {
        conn: any;
    }): Promise<void>;
    help: string[];
    tags: string[];
    command: string[];
    rowner: boolean;
};
export default handler;
//# sourceMappingURL=ai-blocklist.d.ts.map