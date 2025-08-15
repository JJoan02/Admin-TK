export default handler;
declare function handler(m: any, { conn, text }: {
    conn: any;
    text: any;
}): Promise<void>;
declare namespace handler {
    let command: string[];
    let help: string[];
    let tags: string[];
}
//# sourceMappingURL=owner-emotag.d.ts.map