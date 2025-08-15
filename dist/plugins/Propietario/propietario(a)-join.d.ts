export default handler;
declare function handler(m: any, { conn, text, isOwner }: {
    conn: any;
    text: any;
    isOwner: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let register: boolean;
}
//# sourceMappingURL=propietario(a)-join.d.ts.map