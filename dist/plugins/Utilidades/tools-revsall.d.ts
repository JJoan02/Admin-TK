export default handler;
declare function handler(m: any, { conn }: {
    conn: any;
}): Promise<void>;
declare namespace handler {
    let command: string[];
    let help: string[];
    let tags: string[];
    let owner: boolean;
}
//# sourceMappingURL=tools-revsall.d.ts.map