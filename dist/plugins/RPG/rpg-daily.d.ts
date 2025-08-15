export default handler;
declare function handler(m: any, { conn, isPrems }: {
    conn: any;
    isPrems: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let register: boolean;
}
//# sourceMappingURL=rpg-daily.d.ts.map