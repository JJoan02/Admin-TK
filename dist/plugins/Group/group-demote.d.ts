export default handler;
declare function handler(m: any, { conn, usedPrefix, command, text }: {
    conn: any;
    usedPrefix: any;
    command: any;
    text: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let group: boolean;
    let admin: boolean;
    let botAdmin: boolean;
    let fail: any;
}
//# sourceMappingURL=group-demote.d.ts.map