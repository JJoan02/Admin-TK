export default handler;
declare function handler(m: any, { conn, text }: {
    conn: any;
    text: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let command: string[];
    let tags: string[];
}
//# sourceMappingURL=inteligencia-demo.d.ts.map