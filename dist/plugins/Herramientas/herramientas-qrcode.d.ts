export default handler;
declare function handler(m: any, { text, conn }: {
    text: any;
    conn: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let money: number;
}
//# sourceMappingURL=herramientas-qrcode.d.ts.map