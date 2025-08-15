export default handler;
declare function handler(m: any, { args, text, conn, command }: {
    args: any;
    text: any;
    conn: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let command: RegExp;
    let help: string[];
    let tags: string[];
    let register: boolean;
}
//# sourceMappingURL=sugerir.d.ts.map