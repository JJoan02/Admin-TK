export default handler;
declare function handler(m: any, { conn, command }: {
    conn: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    function before(m: any): Promise<any>;
    let tags: string[];
    let help: string[];
    let command: string[];
    let group: boolean;
}
//# sourceMappingURL=fun-marry.d.ts.map