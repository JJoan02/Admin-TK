export default handler;
declare function handler(m: any, { conn: star, command, args, text, usedPrefix }: {
    conn: any;
    command: any;
    args: any;
    text: any;
    usedPrefix: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
}
//# sourceMappingURL=youtube-play.d.ts.map