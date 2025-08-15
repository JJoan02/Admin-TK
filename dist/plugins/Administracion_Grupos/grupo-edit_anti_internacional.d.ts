export default handler;
declare function handler(m: any, { conn, command, text, usedPrefix, isOwner, isROwner, isAdmin }: {
    conn: any;
    command: any;
    text: any;
    usedPrefix: any;
    isOwner: any;
    isROwner: any;
    isAdmin: any;
}): Promise<any>;
declare namespace handler {
    let command: RegExp;
    let register: boolean;
    let group: boolean;
}
//# sourceMappingURL=grupo-edit_anti_internacional.d.ts.map