export default handler;
declare function handler(m: any, { conn, args, text, users, user, usedPrefix, command, isPrems, isOwner, isROwner }: {
    conn: any;
    args: any;
    text: any;
    users: any;
    user: any;
    usedPrefix: any;
    command: any;
    isPrems: any;
    isOwner: any;
    isROwner: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let command: string[];
    let register: boolean;
}
//# sourceMappingURL=rpg-bot_temporal.d.ts.map