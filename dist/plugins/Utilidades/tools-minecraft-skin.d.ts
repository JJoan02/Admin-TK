export default handler;
declare function handler(m: any, { conn, args }: {
    conn: any;
    args: any;
}): Promise<any>;
declare namespace handler {
    let command: RegExp;
    let tag: string[];
    let help: string[];
}
//# sourceMappingURL=tools-minecraft-skin.d.ts.map