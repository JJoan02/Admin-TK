export default handler;
declare function handler(m: any, { conn, args, text }: {
    conn: any;
    args: any;
    text: any;
}): Promise<any>;
declare namespace handler {
    let command: string[];
    let help: string[];
    let tags: string[];
}
//# sourceMappingURL=dl-x.d.ts.map