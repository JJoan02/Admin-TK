export default handler;
declare function handler(m: any): any;
declare namespace handler {
    function before(m: any, { conn, usedPrefix }: {
        conn: any;
        usedPrefix: any;
    }): Promise<true | undefined>;
}
//# sourceMappingURL=autolevelup.d.ts.map