export default handler;
declare function handler(m: any, { conn, text, usedPrefix, command }: {
    conn: any;
    text: any;
    usedPrefix: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let group: boolean;
    let admin: boolean;
    let help: string[];
    let tags: string[];
    let command: RegExp;
}
//# sourceMappingURL=group-sorteo.d.ts.map