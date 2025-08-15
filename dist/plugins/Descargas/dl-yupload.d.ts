export default handler;
declare function handler(m: any, { conn, text, usedPrefix, command, args }: {
    conn: any;
    text: any;
    usedPrefix: any;
    command: any;
    args: any;
}): Promise<void>;
declare namespace handler {
    let command: string[];
    let help: string[];
    let tags: string[];
}
//# sourceMappingURL=dl-yupload.d.ts.map