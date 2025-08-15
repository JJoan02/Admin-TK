export default handler;
declare function handler(m: any, { conn, usedPrefix, command }: {
    conn: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let register: boolean;
    let command: string[];
}
//# sourceMappingURL=convertidor-togifaud.d.ts.map