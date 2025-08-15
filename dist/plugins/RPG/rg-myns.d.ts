export default handler;
declare function handler(m: any, { conn, text, usedPrefix }: {
    conn: any;
    text: any;
    usedPrefix: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let register: boolean;
}
//# sourceMappingURL=rg-myns.d.ts.map