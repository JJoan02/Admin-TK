export default handler;
declare function handler(m: any, { conn }: {
    conn: any;
}): Promise<any>;
declare namespace handler {
    function before(m: any, { conn }: {
        conn: any;
    }): Promise<any>;
    let help: string[];
    let tags: string[];
    let command: string[];
}
//# sourceMappingURL=rpg-rf.d.ts.map