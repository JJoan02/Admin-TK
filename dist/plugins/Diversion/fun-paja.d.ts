export default handler;
declare function handler(m: any, { conn, usedPrefix, text }: {
    conn: any;
    usedPrefix: any;
    text: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
}
//# sourceMappingURL=fun-paja.d.ts.map