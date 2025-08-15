export default handler;
declare function handler(m: any, { conn, __dirname, args }: {
    conn: any;
    __dirname: any;
    args: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let rowner: boolean;
}
//# sourceMappingURL=owner-clearsession.d.ts.map