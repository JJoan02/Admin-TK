export default handler;
declare function handler(m: any, { conn, usedPrefix }: {
    conn: any;
    usedPrefix: any;
}): Promise<void>;
declare namespace handler {
    function before(m: any, { conn, usedPrefix }: {
        conn: any;
        usedPrefix: any;
    }): Promise<any>;
    let help: string[];
    let tags: string[];
    let command: string[];
    let group: boolean;
    let register: boolean;
}
//# sourceMappingURL=game-adivina.d.ts.map