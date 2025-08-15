export default handler;
declare function handler(m: any, { conn }: {
    conn: any;
}): Promise<void>;
declare namespace handler {
    let customPrefix: RegExp;
    let command: RegExp;
    let exp: number;
}
//# sourceMappingURL=s-sticker.d.ts.map