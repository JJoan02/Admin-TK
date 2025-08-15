export default handler;
declare function handler(m: any, { conn, args, text, setting }: {
    conn: any;
    args: any;
    text: any;
    setting: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let command: string[];
    let tags: string[];
}
//# sourceMappingURL=dl-gdrive.d.ts.map