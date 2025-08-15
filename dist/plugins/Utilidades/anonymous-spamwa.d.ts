export default handler;
declare function handler(m: any, { conn, text }: {
    conn: any;
    text: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let premium: boolean;
}
//# sourceMappingURL=anonymous-spamwa.d.ts.map