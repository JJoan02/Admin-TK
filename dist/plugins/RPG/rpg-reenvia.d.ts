export default handler;
declare function handler(m: any, { conn, text, participants, isAdmin, isOwner, usedPrefix, command }: {
    conn: any;
    text: any;
    participants: any;
    isAdmin: any;
    isOwner: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
}
//# sourceMappingURL=rpg-reenvia.d.ts.map