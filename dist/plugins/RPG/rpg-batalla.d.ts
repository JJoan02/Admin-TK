export default handler;
declare function handler(m: any, { conn, text, usedPrefix }: {
    conn: any;
    text: any;
    usedPrefix: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
}
//# sourceMappingURL=rpg-batalla.d.ts.map