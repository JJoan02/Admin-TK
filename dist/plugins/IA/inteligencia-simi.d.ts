export default handler;
declare function handler(m: any, { conn, text, command, args, usedPrefix }: {
    conn: any;
    text: any;
    command: any;
    args: any;
    usedPrefix: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let register: boolean;
    let command: string[];
}
//# sourceMappingURL=inteligencia-simi.d.ts.map