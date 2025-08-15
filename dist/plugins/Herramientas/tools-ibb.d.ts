export default handler;
declare function handler(m: any, { conn }: {
    conn: any;
}): Promise<any>;
declare namespace handler {
    let tags: string[];
    let help: string[];
    let command: RegExp;
    let register: boolean;
}
//# sourceMappingURL=tools-ibb.d.ts.map