export default handler;
declare function handler(m: any): any;
declare namespace handler {
    function before(m: any, { conn }: {
        conn: any;
    }): Promise<true | undefined>;
}
//# sourceMappingURL=_autolevelup.d.ts.map