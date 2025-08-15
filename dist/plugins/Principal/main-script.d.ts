export default handler;
declare function handler(m: any, { conn, args }: {
    conn: any;
    args: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let register: boolean;
}
//# sourceMappingURL=main-script.d.ts.map