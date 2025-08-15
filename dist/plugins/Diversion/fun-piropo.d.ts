export default handler;
declare function handler(m: any, { conn, text }: {
    conn: any;
    text: any;
}): Promise<void>;
declare namespace handler {
    let tags: string[];
    let command: string[];
    let help: string[];
    let register: boolean;
    let fail: any;
    let exp: number;
}
//# sourceMappingURL=fun-piropo.d.ts.map