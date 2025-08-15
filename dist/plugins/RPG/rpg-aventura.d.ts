export default handler;
declare function handler(m: any, { conn }: {
    conn: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let cooldown: number;
}
//# sourceMappingURL=rpg-aventura.d.ts.map