export default handler;
declare function handler(m: any, { conn, text, command, usedPrefix, args }: {
    conn: any;
    text: any;
    command: any;
    usedPrefix: any;
    args: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let group: boolean;
    let game: boolean;
    let register: boolean;
}
//# sourceMappingURL=fun-game.d.ts.map