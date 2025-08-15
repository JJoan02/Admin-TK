export default handler;
declare function handler(m: any, { conn, isAdmin, groupMetadata }: {
    conn: any;
    isAdmin: any;
    groupMetadata: any;
}): Promise<any>;
declare namespace handler {
    let tags: string[];
    let help: string[];
    let command: string[];
    let rowner: boolean;
    let group: boolean;
    let botAdmin: boolean;
}
//# sourceMappingURL=owner-autoadmin.d.ts.map