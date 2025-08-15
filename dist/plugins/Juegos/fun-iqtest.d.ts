export default handler;
declare function handler(m: any, { conn }: {
    conn: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let register: boolean;
    let fail: any;
}
//# sourceMappingURL=fun-iqtest.d.ts.map