export default handler;
declare function handler(m: any, { conn, args, participants }: {
    conn: any;
    args: any;
    participants: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let group: boolean;
}
//# sourceMappingURL=econ-leaderboard.d.ts.map