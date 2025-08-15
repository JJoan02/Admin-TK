export default handler;
declare function handler(m: any, { conn, text, args }: {
    conn: any;
    text: any;
    args: any;
}): Promise<any>;
declare namespace handler {
    let command: string[];
    let help: string[];
    let tags: string[];
}
//# sourceMappingURL=dl-ytmp3.d.ts.map