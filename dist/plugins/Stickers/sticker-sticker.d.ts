export default handler;
declare function handler(m: any, { conn, args, usedPrefix, command }: {
    conn: any;
    args: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let group: boolean;
    let register: boolean;
    let command: string[];
}
//# sourceMappingURL=sticker-sticker.d.ts.map