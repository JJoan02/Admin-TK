export default handler;
declare function handler(m: any, { conn, args, text }: {
    conn: any;
    args: any;
    text: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let fail: any;
    let register: boolean;
}
//# sourceMappingURL=tools-acortar.d.ts.map