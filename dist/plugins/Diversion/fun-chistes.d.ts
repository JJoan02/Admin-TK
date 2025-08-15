export default handler;
declare function handler(m: any, { conn, text }: {
    conn: any;
    text: any;
}): Promise<void>;
declare namespace handler {
    let tags: string[];
    let command: string[];
    let register: boolean;
}
//# sourceMappingURL=fun-chistes.d.ts.map