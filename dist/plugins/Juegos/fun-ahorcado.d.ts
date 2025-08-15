export default handler;
declare function handler(m: any, { conn }: {
    conn: any;
}): Promise<any>;
declare namespace handler {
    function before(m: any, { conn }: {
        conn: any;
    }): Promise<void>;
    let help: string[];
    let tags: string[];
    let command: string[];
    let register: boolean;
}
//# sourceMappingURL=fun-ahorcado.d.ts.map