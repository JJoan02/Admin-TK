declare const handler: {
    (m: any, { conn, command, text }: {
        conn: any;
        command: any;
        text: any;
    }): Promise<any>;
    help: string[];
    tags: string[];
    command: string[];
    rowner: boolean;
};
export default handler;
//# sourceMappingURL=ai-addprem.d.ts.map