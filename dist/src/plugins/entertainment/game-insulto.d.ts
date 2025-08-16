declare function handler(m: any, { conn, usedPrefix }: {
    conn: any;
    usedPrefix: any;
}): Promise<void>;
declare namespace handler {
    var help: string[];
    var tags: string[];
    var command: string[];
}
export default handler;
//# sourceMappingURL=game-insulto.d.ts.map