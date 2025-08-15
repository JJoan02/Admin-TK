export default handler;
declare function handler(m: any, { conn }: {
    conn: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let rowner: boolean;
}
//# sourceMappingURL=owner-blocklist.d.ts.map