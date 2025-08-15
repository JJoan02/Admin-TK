export default handler;
declare function handler(m: any, { conn, command, usedPrefix, text }: {
    conn: any;
    command: any;
    usedPrefix: any;
    text: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let owner: boolean;
}
//# sourceMappingURL=propietario(a)-broadcast-chats_privados.d.ts.map