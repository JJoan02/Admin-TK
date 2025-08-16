declare const handler: {
    (m: any, { conn }: {
        conn: any;
    }): Promise<any>;
    command: string[];
    botAdmin: boolean;
    before(m: any, { conn }: {
        conn: any;
    }): Promise<any>;
};
export default handler;
//# sourceMappingURL=game-ruletamuerte.d.ts.map