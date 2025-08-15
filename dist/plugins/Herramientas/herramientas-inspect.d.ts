export default handler;
declare function handler(m: any, { conn, command, usedPrefix, args, text, groupMetadata, isOwner, isROwner }: {
    conn: any;
    command: any;
    usedPrefix: any;
    args: any;
    text: any;
    groupMetadata: any;
    isOwner: any;
    isROwner: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let register: boolean;
}
//# sourceMappingURL=herramientas-inspect.d.ts.map