export default handler;
declare function handler(m: any, { conn, args, isOwner, command }: {
    conn: any;
    args: any;
    isOwner: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let command: string[];
    let owner: boolean;
}
//# sourceMappingURL=config-on-off-Owner.d.ts.map