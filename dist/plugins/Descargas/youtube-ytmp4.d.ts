export default handler;
declare function handler(m: any, { conn, args, text, isPrems, isOwner, usedPrefix, command }: {
    conn: any;
    args: any;
    text: any;
    isPrems: any;
    isOwner: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let register: boolean;
}
//# sourceMappingURL=youtube-ytmp4.d.ts.map