export default handler;
declare function handler(m: any, { conn, usedPrefix, command, text }: {
    conn: any;
    usedPrefix: any;
    command: any;
    text: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let register: boolean;
}
//# sourceMappingURL=fun-morse.d.ts.map