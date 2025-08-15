export default mate;
declare function mate(m: any, { conn }: {
    conn: any;
}): Promise<any>;
declare namespace mate {
    function before(m: any, { conn }: {
        conn: any;
    }): Promise<any>;
    let command: RegExp;
}
//# sourceMappingURL=fun-mate.d.ts.map