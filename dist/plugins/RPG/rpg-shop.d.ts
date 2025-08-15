export default handler;
declare function handler(m: any, { conn, command, args }: {
    conn: any;
    command: any;
    args: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let disabled: boolean;
}
//# sourceMappingURL=rpg-shop.d.ts.map