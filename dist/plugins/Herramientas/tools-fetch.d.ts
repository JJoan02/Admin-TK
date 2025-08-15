export default handler;
declare function handler(m: any, { text, conn }: {
    text: any;
    conn: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
}
//# sourceMappingURL=tools-fetch.d.ts.map