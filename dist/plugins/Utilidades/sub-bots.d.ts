export function gataJadiBot(options: any): Promise<void>;
export function startSubBots(): Promise<void>;
export default handler;
declare function handler(m: any, { conn, args, usedPrefix, command, isOwner }: {
    conn: any;
    args: any;
    usedPrefix: any;
    command: any;
    isOwner: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
}
//# sourceMappingURL=sub-bots.d.ts.map