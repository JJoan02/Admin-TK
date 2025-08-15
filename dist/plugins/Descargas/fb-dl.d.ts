export default handler;
declare function handler(m: any, { args, command, conn }: {
    args: any;
    command: any;
    conn: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
}
//# sourceMappingURL=fb-dl.d.ts.map