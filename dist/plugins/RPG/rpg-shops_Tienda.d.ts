export default handler;
declare function handler(m: any, { command, conn, usedPrefix, args }: {
    command: any;
    conn: any;
    usedPrefix: any;
    args: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let disabled: boolean;
    let register: boolean;
}
//# sourceMappingURL=rpg-shops_Tienda.d.ts.map