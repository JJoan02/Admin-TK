export default handler;
declare function handler(m: any, { conn, text, command, usedPrefix }: {
    conn: any;
    text: any;
    command: any;
    usedPrefix: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let limit: boolean;
}
//# sourceMappingURL=herramientas-geminiimg.d.ts.map