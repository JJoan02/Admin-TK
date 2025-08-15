export default handler;
declare function handler(m: any, { conn, text }: {
    conn: any;
    text: any;
}): Promise<void>;
declare namespace handler {
    let command: RegExp;
    let tag: string[];
    let help: string[];
}
//# sourceMappingURL=fun-doxeo.d.ts.map