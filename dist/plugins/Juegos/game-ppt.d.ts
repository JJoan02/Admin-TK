export default handler;
declare function handler(m: any, { conn, args }: {
    conn: any;
    args: any;
}): Promise<any>;
declare namespace handler {
    function before(m: any, { conn }: {
        conn: any;
    }): Promise<any>;
    let command: RegExp;
    let tags: string[];
    let help: string[];
    let group: boolean;
}
//# sourceMappingURL=game-ppt.d.ts.map