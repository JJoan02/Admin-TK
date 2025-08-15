export default handler;
declare function handler(m: any, { conn }: {
    conn: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let register: boolean;
    let command: string[];
}
//# sourceMappingURL=fun-reto.d.ts.map