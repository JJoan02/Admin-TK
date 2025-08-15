export default handler;
declare function handler(m: any, { conn, usedPrefix, command }: {
    conn: any;
    usedPrefix: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let command: string[];
    let tag: string[];
    let help: string[];
}
//# sourceMappingURL=rg-perfildates.d.ts.map