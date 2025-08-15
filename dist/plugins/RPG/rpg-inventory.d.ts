export default handler;
declare function handler(m: any, { conn, args, command, jid, text, usedPrefix }: {
    conn: any;
    args: any;
    command: any;
    jid: any;
    text: any;
    usedPrefix: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let register: boolean;
}
//# sourceMappingURL=rpg-inventory.d.ts.map