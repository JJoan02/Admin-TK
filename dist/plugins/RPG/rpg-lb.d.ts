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
    let register: boolean;
    let fail: any;
    let exp: number;
}
//# sourceMappingURL=rpg-lb.d.ts.map