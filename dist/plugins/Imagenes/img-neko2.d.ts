export default handler;
declare function handler(m: any, { conn }: {
    conn: any;
}): Promise<void>;
declare namespace handler {
    let command: string[];
    let tags: string[];
    let help: string[];
    let register: boolean;
}
//# sourceMappingURL=img-neko2.d.ts.map