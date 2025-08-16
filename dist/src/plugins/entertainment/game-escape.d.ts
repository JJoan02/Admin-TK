declare const handler: {
    (m: any, { conn }: {
        conn: any;
    }): Promise<void>;
    before(m: any, { conn }: {
        conn: any;
    }): Promise<any>;
    command: string[];
};
export default handler;
//# sourceMappingURL=game-escape.d.ts.map