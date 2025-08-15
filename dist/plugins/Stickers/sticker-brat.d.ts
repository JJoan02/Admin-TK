export default handler;
declare function handler(m: any, { text, conn }: {
    text: any;
    conn: any;
}): Promise<any>;
declare namespace handler {
    let command: string[];
    let tags: string[];
    let help: string[];
}
//# sourceMappingURL=sticker-brat.d.ts.map