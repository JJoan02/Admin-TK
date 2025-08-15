export default handler;
declare function handler(m: any, { conn, text, args, groupMetadata }: {
    conn: any;
    text: any;
    args: any;
    groupMetadata: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let group: boolean;
    let admin: boolean;
    let botAdmin: boolean;
}
//# sourceMappingURL=grupo-inactivos.d.ts.map