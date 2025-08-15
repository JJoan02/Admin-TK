export default handler;
declare function handler(m: any, { conn, command, text, usedPrefix }: {
    conn: any;
    command: any;
    text: any;
    usedPrefix: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let register: boolean;
    let group: boolean;
    let command: string[];
}
//# sourceMappingURL=game-calculador.d.ts.map