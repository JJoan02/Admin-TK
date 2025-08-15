export default handler;
declare function handler(m: any, { conn, text }: {
    conn: any;
    text: any;
}): Promise<any>;
declare namespace handler {
    let command: string[];
    let help: string[];
    let tags: string[];
}
//# sourceMappingURL=tools-shazam.d.ts.map