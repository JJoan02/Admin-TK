export default handler;
declare function handler(m: any, { conn, text }: {
    conn: any;
    text: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let register: boolean;
    let command: string[];
}
//# sourceMappingURL=inteligencia-gifted.d.ts.map