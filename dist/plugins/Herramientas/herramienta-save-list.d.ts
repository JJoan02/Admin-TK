export default handler;
declare function handler(m: any, { conn, text, isOwner, usedPrefix, command }: {
    conn: any;
    text: any;
    isOwner: any;
    usedPrefix: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let register: boolean;
}
//# sourceMappingURL=herramienta-save-list.d.ts.map