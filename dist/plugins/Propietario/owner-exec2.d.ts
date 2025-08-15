export default handler;
declare function handler(m: any, { conn, isOwner, command, text, usedPrefix, args, isROwner }: {
    conn: any;
    isOwner: any;
    command: any;
    text: any;
    usedPrefix: any;
    args: any;
    isROwner: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let customPrefix: RegExp;
    let command: RegExp;
    let rowner: boolean;
}
//# sourceMappingURL=owner-exec2.d.ts.map