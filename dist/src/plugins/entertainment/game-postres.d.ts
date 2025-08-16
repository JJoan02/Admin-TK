declare const handler: {
    (m: any, { conn }: {
        conn: any;
    }): Promise<void>;
    before(m: any, { conn }: {
        conn: any;
    }): Promise<void>;
    command: string[];
};
export default handler;
//# sourceMappingURL=game-postres.d.ts.map