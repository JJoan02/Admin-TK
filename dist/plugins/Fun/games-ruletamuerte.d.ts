export default handler;
declare function handler(m: any, { conn }: {
    conn: any;
}): Promise<any>;
declare namespace handler {
    let command: string[];
    let botAdmin: boolean;
    function before(m: any, { conn }: {
        conn: any;
    }): Promise<any>;
}
//# sourceMappingURL=games-ruletamuerte.d.ts.map