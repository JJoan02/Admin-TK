export default handler;
declare function handler(m: any, { conn, text, usedPrefix, command, args }: {
    conn: any;
    text: any;
    usedPrefix: any;
    command: any;
    args: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
}
//# sourceMappingURL=rpg-serpremium.d.ts.map