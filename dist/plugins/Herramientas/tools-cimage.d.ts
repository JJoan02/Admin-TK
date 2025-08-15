export default handler;
declare function handler(m: any, { conn, args, command }: {
    conn: any;
    args: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let command: string[];
    let tags: string[];
}
//# sourceMappingURL=tools-cimage.d.ts.map