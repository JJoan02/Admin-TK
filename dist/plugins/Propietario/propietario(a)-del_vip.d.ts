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
    let group: boolean;
    let admin: boolean;
    let botAdmin: boolean;
    let owner: boolean;
}
//# sourceMappingURL=propietario(a)-del_vip.d.ts.map