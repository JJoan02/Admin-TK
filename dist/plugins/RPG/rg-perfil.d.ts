export default handler;
declare function handler(m: any, { conn }: {
    conn: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let register: boolean;
    let group: boolean;
    let tags: string[];
    let command: string[];
}
//# sourceMappingURL=rg-perfil.d.ts.map