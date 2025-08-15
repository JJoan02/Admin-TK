export default handler;
declare function handler(m: any, { conn, text, usedPrefix, command }: {
    conn: any;
    text: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let register: boolean;
}
//# sourceMappingURL=tools-ai2.d.ts.map