export default handler;
declare function handler(m: any, { conn, command, text }: {
    conn: any;
    command: any;
    text: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
}
//# sourceMappingURL=fun-kachero.d.ts.map