export default handler;
declare function handler(m: any, { conn }: {
    conn: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let register: boolean;
    let group: boolean;
    let rowner: boolean;
}
//# sourceMappingURL=rpg-resetpersonajes.d.ts.map