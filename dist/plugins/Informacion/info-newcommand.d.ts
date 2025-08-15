export default handler;
declare function handler(m: any, { conn, text, usedPrefix, command, nombre }: {
    conn: any;
    text: any;
    usedPrefix: any;
    command: any;
    nombre: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
}
//# sourceMappingURL=info-newcommand.d.ts.map