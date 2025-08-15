export default handler;
declare function handler(m: any, { conn, text, command, usedPrefix }: {
    conn: any;
    text: any;
    command: any;
    usedPrefix: any;
}): Promise<any>;
declare namespace handler {
    let tags: string[];
    let help: string[];
    let command: string[];
    let register: boolean;
}
//# sourceMappingURL=fun-ruleta.d.ts.map