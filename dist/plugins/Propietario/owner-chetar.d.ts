export default handler;
declare function handler(m: any, { conn }: {
    conn: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let rowner: boolean;
    let fail: any;
}
//# sourceMappingURL=owner-chetar.d.ts.map