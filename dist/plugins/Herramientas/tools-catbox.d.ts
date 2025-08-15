export default handler;
declare function handler(m: any, { conn }: {
    conn: any;
}): Promise<any>;
declare namespace handler {
    let tags: string[];
    let help: string[];
    let command: string[];
    let register: boolean;
}
//# sourceMappingURL=tools-catbox.d.ts.map