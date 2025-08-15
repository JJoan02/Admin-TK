export default handler;
declare function handler(m: any, { conn }: {
    conn: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let exp: number;
    let register: boolean;
}
//# sourceMappingURL=info-grupos-lista.d.ts.map