export default handler;
declare function handler(m: any, { conn, args, usedPrefix, command }: {
    conn: any;
    args: any;
    usedPrefix: any;
    command: any;
}): Promise<never>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let cookie: number;
    let limit: number;
    let register: boolean;
}
//# sourceMappingURL=sticker-telegram.d.ts.map