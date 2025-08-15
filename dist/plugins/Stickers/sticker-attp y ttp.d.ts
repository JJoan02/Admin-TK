export default handler;
declare function handler(m: any, { conn, text, args, usedPrefix, command }: {
    conn: any;
    text: any;
    args: any;
    usedPrefix: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let register: boolean;
}
//# sourceMappingURL=sticker-attp%20y%20ttp.d.ts.map