export default handler;
declare function handler(m: any, { conn, isOwner, isROwner, command, text }: {
    conn: any;
    isOwner: any;
    isROwner: any;
    command: any;
    text: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let customPrefix: RegExp;
    let command: RegExp;
}
//# sourceMappingURL=propietario(a)-exec2.d.ts.map