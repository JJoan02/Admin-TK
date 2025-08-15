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
    let disable: boolean;
    let register: boolean;
    let limit: boolean;
}
//# sourceMappingURL=descargas-tiktok_mp3.d.ts.map