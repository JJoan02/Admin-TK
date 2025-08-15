export default handler;
declare function handler(m: any, { conn, text, command, args, usedPrefix }: {
    conn: any;
    text: any;
    command: any;
    args: any;
    usedPrefix: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let group: boolean;
    let register: boolean;
    let command: string[];
}
//# sourceMappingURL=fun-simi.d.ts.map