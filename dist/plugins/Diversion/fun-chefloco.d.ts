export default handler;
declare function handler(m: any, { conn }: {
    conn: any;
}): Promise<void>;
declare namespace handler {
    function before(m: any, { conn }: {
        conn: any;
    }): Promise<void>;
    let command: string[];
}
//# sourceMappingURL=fun-chefloco.d.ts.map