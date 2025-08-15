export default handler;
declare function handler(m: any, { conn, groupMetadata }: {
    conn: any;
    groupMetadata: any;
}): Promise<any>;
declare namespace handler {
    let command: RegExp;
    let group: boolean;
    let tags: string[];
    let admin: boolean;
    let botAdmin: boolean;
}
//# sourceMappingURL=game-ruletaldelban.d.ts.map