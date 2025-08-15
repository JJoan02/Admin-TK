export default handler;
declare function handler(m: any, { conn, command, text, usedPrefix, args }: {
    conn: any;
    command: any;
    text: any;
    usedPrefix: any;
    args: any;
}): Promise<any>;
declare namespace handler {
    let tags: string[];
    let command: string[];
    let register: boolean;
}
//# sourceMappingURL=fun-randow.d.ts.map