export default handler;
declare function handler(m: any, { groupMetadata, command, conn, text, usedPrefix }: {
    groupMetadata: any;
    command: any;
    conn: any;
    text: any;
    usedPrefix: any;
}): any;
declare namespace handler {
    let help: string[];
    let command: string[];
    let tags: string[];
    let group: boolean;
}
//# sourceMappingURL=fun-top-10.d.ts.map