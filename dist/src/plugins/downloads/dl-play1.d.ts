declare const handler: {
    (m: any, { conn, text, command }: {
        conn: any;
        text: any;
        command: any;
    }): Promise<any>;
    help: string[];
    tags: string[];
    command: string[];
};
export default handler;
//# sourceMappingURL=dl-play1.d.ts.map