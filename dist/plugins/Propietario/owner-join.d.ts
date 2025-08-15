export default handler;
declare function handler(m: any, { conn, args, isOwner }: {
    conn: any;
    args: any;
    isOwner: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
}
//# sourceMappingURL=owner-join.d.ts.map