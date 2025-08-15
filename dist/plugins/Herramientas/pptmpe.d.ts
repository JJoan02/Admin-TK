export default handler;
declare function handler(m: any, { conn }: {
    conn: any;
}): Promise<any>;
declare namespace handler {
    let command: RegExp;
    let register: boolean;
    let help: string[];
    let tags: string[];
}
//# sourceMappingURL=pptmpe.d.ts.map