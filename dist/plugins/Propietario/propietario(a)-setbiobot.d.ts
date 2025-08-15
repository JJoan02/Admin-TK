export default handler;
declare function handler(m: any, { conn, text }: {
    conn: any;
    text: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let owner: boolean;
}
//# sourceMappingURL=propietario(a)-setbiobot.d.ts.map