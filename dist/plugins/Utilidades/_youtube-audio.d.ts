export default handler;
declare function handler(m: any, { conn, text, isPrems, isOwner, usedPrefix, command }: {
    conn: any;
    text: any;
    isPrems: any;
    isOwner: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let customPrefix: RegExp;
    let command: RegExp;
}
//# sourceMappingURL=_youtube-audio.d.ts.map