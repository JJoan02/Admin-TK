export default handler;
declare function handler(m: any, { conn, text, command }: {
    conn: any;
    text: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let command: RegExp;
    let group: boolean;
    let rowner: boolean;
}
//# sourceMappingURL=owner-salir.d.ts.map