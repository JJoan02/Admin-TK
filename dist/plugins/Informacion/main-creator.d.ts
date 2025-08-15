export default handler;
declare function handler(m: any, { conn, usedPrefix, isOwner }: {
    conn: any;
    usedPrefix: any;
    isOwner: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
}
//# sourceMappingURL=main-creator.d.ts.map