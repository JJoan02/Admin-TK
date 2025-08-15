export default handler;
declare function handler(m: any, { conn, command }: {
    conn: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let tags: string[];
    let command: string[];
    let help: string[];
    let rowner: boolean;
}
//# sourceMappingURL=propietario(a)-reunion.d.ts.map