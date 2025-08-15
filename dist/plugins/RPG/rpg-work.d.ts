export default handler;
declare function handler(m: any, { conn, isPrems }: {
    conn: any;
    isPrems: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let fail: any;
    let exp: number;
}
//# sourceMappingURL=rpg-work.d.ts.map