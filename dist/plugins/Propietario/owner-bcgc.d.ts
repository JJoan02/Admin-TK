export default handler;
declare function handler(m: any, { conn, isROwner, text }: {
    conn: any;
    isROwner: any;
    text: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let owner: boolean;
}
//# sourceMappingURL=owner-bcgc.d.ts.map