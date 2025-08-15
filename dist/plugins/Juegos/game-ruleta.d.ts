export default handler;
declare function handler(m: any, { conn, text, command, usedPrefix }: {
    conn: any;
    text: any;
    command: any;
    usedPrefix: any;
}): Promise<any>;
declare namespace handler {
    let tags: string[];
    let help: string[];
    let command: string[];
    let register: boolean;
    let group: boolean;
}
//# sourceMappingURL=game-ruleta.d.ts.map