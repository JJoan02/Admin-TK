export default handler;
declare function handler(m: any, { conn, usedPrefix }: {
    conn: any;
    usedPrefix: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let register: boolean;
}
//# sourceMappingURL=rpg-kandang_animales.d.ts.map