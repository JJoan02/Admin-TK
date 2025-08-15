export default handler;
declare function handler(m: any, { conn, text, usedPrefix, command, isOwner }: {
    conn: any;
    text: any;
    usedPrefix: any;
    command: any;
    isOwner: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let register: boolean;
}
//# sourceMappingURL=herramientas-save.d.ts.map