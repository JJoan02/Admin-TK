export default handler;
declare function handler(m: any, { conn, command, args, text, usedPrefix }: {
    conn: any;
    command: any;
    args: any;
    text: any;
    usedPrefix: any;
}): Promise<any>;
declare namespace handler {
    function before(m: any, { conn }: {
        conn: any;
    }): Promise<void>;
    let command: RegExp;
    let register: boolean;
}
//# sourceMappingURL=descargas-yt_play.d.ts.map