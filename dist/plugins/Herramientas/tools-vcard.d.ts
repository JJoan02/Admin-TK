export default handler;
declare function handler(m: any, { conn, args, text, usedPrefix, command }: {
    conn: any;
    args: any;
    text: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let group: boolean;
    let register: boolean;
}
//# sourceMappingURL=tools-vcard.d.ts.map