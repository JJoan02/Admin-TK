export default handler;
declare function handler(m: any, { conn, text, args }: {
    conn: any;
    text: any;
    args: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let command: string[];
    let tags: string[];
}
//# sourceMappingURL=dl-pinterest.d.ts.map