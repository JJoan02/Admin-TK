declare function handler(m: any, { groupMetadata, command, conn, text, usedPrefix }: {
    groupMetadata: any;
    command: any;
    conn: any;
    text: any;
    usedPrefix: any;
}): Promise<void>;
declare namespace handler {
    var help: string[];
    var command: string[];
    var tags: string[];
    var group: boolean;
}
export default handler;
//# sourceMappingURL=util-sorteo.d.ts.map