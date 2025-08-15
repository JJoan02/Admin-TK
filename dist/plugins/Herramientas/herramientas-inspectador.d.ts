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
    let tags: string[];
    let help: string[];
    let command: string[];
    let register: boolean;
}
//# sourceMappingURL=herramientas-inspectador.d.ts.map