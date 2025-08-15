export default handler;
declare function handler(m: any, { conn, text, usedPrefix, command }: {
    conn: any;
    text: any;
    usedPrefix: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let menu: string[];
    let tags: string[];
    let command: RegExp;
    let register: boolean;
    let level: number;
    let limit: number;
}
//# sourceMappingURL=descargas-tiktokimg.d.ts.map