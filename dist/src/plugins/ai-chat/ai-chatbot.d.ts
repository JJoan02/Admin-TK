declare const handler: {
    (m: any, { conn, text }: {
        conn: any;
        text: any;
    }): Promise<any>;
    help: string[];
    tags: string[];
    command: string[];
};
export default handler;
//# sourceMappingURL=ai-chatbot.d.ts.map