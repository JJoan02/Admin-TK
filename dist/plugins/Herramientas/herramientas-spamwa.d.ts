export default handler;
declare function handler(m: any, { conn, text, usedPrefix, command }: {
    conn: any;
    text: any;
    usedPrefix: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let group: boolean;
    let premium: boolean;
    let register: boolean;
    let level: number;
    let limit: number;
}
//# sourceMappingURL=herramientas-spamwa.d.ts.map