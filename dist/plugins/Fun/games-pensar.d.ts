export default handler;
declare function handler(m: any, { conn }: {
    conn: any;
}): Promise<any>;
declare namespace handler {
    let command: string[];
    function before(m: any, { conn }: {
        conn: any;
    }): Promise<any>;
}
//# sourceMappingURL=games-pensar.d.ts.map