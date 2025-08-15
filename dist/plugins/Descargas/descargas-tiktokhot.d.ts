export default handler;
declare function handler(m: any, { conn, usedPrefix, command }: {
    conn: any;
    usedPrefix: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
}
//# sourceMappingURL=descargas-tiktokhot.d.ts.map