export default handler;
declare function handler(m: any, { conn, text, command, usedPrefix }: {
    conn: any;
    text: any;
    command: any;
    usedPrefix: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let group: boolean;
    let admin: boolean;
    let botAdmin: boolean;
}
//# sourceMappingURL=grupo-advertencia_eliminar.d.ts.map