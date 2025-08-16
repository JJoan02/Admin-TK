declare const handler: {
    (m: any, { conn }: {
        conn: any;
    }): Promise<any>;
    command: string[];
    before(m: any, { conn }: {
        conn: any;
    }): Promise<any>;
};
export default handler;
//# sourceMappingURL=game-pensar.d.ts.map