export default handler;
declare function handler(m: any, { conn, args }: {
    conn: any;
    args: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let admin: boolean;
    let fail: any;
}
//# sourceMappingURL=rpg-quitardulces.d.ts.map