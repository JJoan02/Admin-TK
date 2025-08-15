export default handler;
declare function handler(m: any, { conn, args, usedPrefix, command, text }: {
    conn: any;
    args: any;
    usedPrefix: any;
    command: any;
    text: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let register: boolean;
}
//# sourceMappingURL=tools-react.d.ts.map