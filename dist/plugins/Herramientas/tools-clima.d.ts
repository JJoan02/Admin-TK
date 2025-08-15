export default handler;
declare function handler(m: any, { conn, command }: {
    conn: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let admin: boolean;
    let group: boolean;
}
//# sourceMappingURL=tools-clima.d.ts.map