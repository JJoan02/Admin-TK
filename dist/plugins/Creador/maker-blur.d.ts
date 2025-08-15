export default handler;
declare function handler(m: any, { conn, usedprefix }: {
    conn: any;
    usedprefix: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
}
//# sourceMappingURL=maker-blur.d.ts.map