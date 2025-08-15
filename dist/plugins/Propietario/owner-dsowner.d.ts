export default handler;
declare function handler(m: any, { conn, usedPrefix }: {
    conn: any;
    usedPrefix: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let rowner: boolean;
}
//# sourceMappingURL=owner-dsowner.d.ts.map