export default handler;
declare function handler(m: any, { conn, usedPrefix, isOwner }: {
    conn: any;
    usedPrefix: any;
    isOwner: any;
}): Promise<void>;
declare namespace handler {
    let customPrefix: RegExp;
    let command: RegExp;
}
//# sourceMappingURL=owner-noetiqueta.d.ts.map