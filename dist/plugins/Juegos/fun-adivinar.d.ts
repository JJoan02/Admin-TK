export default handler;
declare function handler(m: any, { conn, command }: {
    conn: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    function before(m: any): Promise<void>;
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let register: boolean;
}
//# sourceMappingURL=fun-adivinar.d.ts.map