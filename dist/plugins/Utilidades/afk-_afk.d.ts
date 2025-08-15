export default handler;
declare function handler(m: any): any;
declare namespace handler {
    function before(m: any, { text, args, usedPrefix, command, conn }: {
        text: any;
        args: any;
        usedPrefix: any;
        command: any;
        conn: any;
    }): Promise<boolean>;
}
//# sourceMappingURL=afk-_afk.d.ts.map