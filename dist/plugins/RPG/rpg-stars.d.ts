export default handler;
declare function handler(m: any, { conn, usedPrefix }: {
    conn: any;
    usedPrefix: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let register: boolean;
}
//# sourceMappingURL=rpg-stars.d.ts.map