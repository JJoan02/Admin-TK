declare function handler(m: any, { groupMetadata, command, conn, text, usedPrefix }: {
    groupMetadata: any;
    command: any;
    conn: any;
    text: any;
    usedPrefix: any;
}): any;
declare namespace handler {
    var help: string[];
    var command: string[];
    var tags: string[];
    var group: boolean;
}
export default handler;
//# sourceMappingURL=game-top.d.ts.map