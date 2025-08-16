declare const handler: {
    (m: any, { conn, text }: {
        conn: any;
        text: any;
    }): Promise<void>;
    help: string[];
    tags: string[];
    register: boolean;
    command: string[];
};
export default handler;
//# sourceMappingURL=dl-take.d.ts.map