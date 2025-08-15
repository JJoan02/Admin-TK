export default handler;
declare function handler(m: any, { conn, usedPrefix, command, text }: {
    conn: any;
    usedPrefix: any;
    command: any;
    text: any;
}): Promise<any>;
declare namespace handler {
    let tags: string[];
    let help: string[];
    let command: string[];
    let register: boolean;
}
//# sourceMappingURL=fun-consultor.d.ts.map