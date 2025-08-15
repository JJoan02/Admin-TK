export default handler;
declare function handler(m: any, { conn, text }: {
    conn: any;
    text: any;
}): Promise<void>;
declare namespace handler {
    let command: string[];
    let help: string[];
    let estrellas: number;
    let tags: string[];
}
//# sourceMappingURL=tools-demo.d.ts.map