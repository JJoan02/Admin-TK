declare const handler: {
    (m: any, { conn, text }: {
        conn: any;
        text: any;
    }): Promise<any>;
    help: string[];
    tags: string[];
    command: string[];
    premium: boolean;
};
export default handler;
//# sourceMappingURL=ai-spamwa.d.ts.map