export default handler;
declare function handler(m: any, { conn, command, usedPrefix }: {
    conn: any;
    command: any;
    usedPrefix: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let command: string[];
    let register: boolean;
    let tags: string[];
}
//# sourceMappingURL=info-creador.d.ts.map