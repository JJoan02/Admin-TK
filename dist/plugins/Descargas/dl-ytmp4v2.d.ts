export default handler;
declare function handler(m: any, { conn, text, args, command }: {
    conn: any;
    text: any;
    args: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let command: string[];
    let help: string[];
    let tags: string[];
}
//# sourceMappingURL=dl-ytmp4v2.d.ts.map