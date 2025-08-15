export default handler;
declare function handler(m: any, { args, text, command, conn }: {
    args: any;
    text: any;
    command: any;
    conn: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let command: string[];
    let tags: string[];
}
//# sourceMappingURL=tools-rc.d.ts.map