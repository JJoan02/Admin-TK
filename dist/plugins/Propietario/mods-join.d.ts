export default handler;
declare function handler(m: any, { conn, text, isOwner, usedPrefix, command }: {
    conn: any;
    text: any;
    isOwner: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let rowner: boolean;
}
//# sourceMappingURL=mods-join.d.ts.map