export default handler;
declare function handler(m: any, { conn, args, participants, usedPrefix }: {
    conn: any;
    args: any;
    participants: any;
    usedPrefix: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let register: boolean;
    let fail: any;
    let exp: number;
}
//# sourceMappingURL=rpg-leaderboard.d.ts.map