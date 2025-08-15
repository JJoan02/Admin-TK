export default handler;
declare function handler(m: any, { text, conn }: {
    text: any;
    conn: any;
}): Promise<any>;
declare namespace handler {
    function before(m: any, { conn }: {
        conn: any;
    }): Promise<void>;
    let command: string[];
    let tags: string[];
    let help: string[];
}
//# sourceMappingURL=dl-xnxx.d.ts.map