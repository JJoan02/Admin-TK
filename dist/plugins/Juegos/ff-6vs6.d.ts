export default handler;
declare function handler(m: any, { conn, args }: {
    conn: any;
    args: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let group: boolean;
    let admin: boolean;
}
//# sourceMappingURL=ff-6vs6.d.ts.map