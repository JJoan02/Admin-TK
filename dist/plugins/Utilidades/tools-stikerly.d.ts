export default handler;
declare function handler(m: any, { conn, text, command }: {
    conn: any;
    text: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
}
//# sourceMappingURL=tools-stikerly.d.ts.map