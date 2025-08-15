export default handler;
declare function handler(m: any, { conn, args, usedPrefix, command }: {
    conn: any;
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
//# sourceMappingURL=tools-tts.d.ts.map