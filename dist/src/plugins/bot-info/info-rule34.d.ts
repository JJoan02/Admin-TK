declare const handler: {
    (m: any, { conn, text }: {
        conn: any;
        text: any;
    }): Promise<any>;
    help: string[];
    tags: string[];
    register: boolean;
    command: string[];
};
export default handler;
//# sourceMappingURL=info-rule34.d.ts.map