export default handler;
declare function handler(m: any, { conn, text }: {
    conn: any;
    text: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let limit: number;
    let register: boolean;
}
//# sourceMappingURL=propietario(a)-fetch_get.d.ts.map