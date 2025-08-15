export default handler;
declare function handler(m: any, { conn, usedPrefix, command, isRowner }: {
    conn: any;
    usedPrefix: any;
    command: any;
    isRowner: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
}
//# sourceMappingURL=info-velocidad.d.ts.map