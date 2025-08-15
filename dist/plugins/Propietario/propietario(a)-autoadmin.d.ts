export default handler;
declare function handler(m: any, { conn, isAdmin }: {
    conn: any;
    isAdmin: any;
}): Promise<void>;
declare namespace handler {
    let command: RegExp;
    let rowner: boolean;
    let botAdmin: boolean;
}
//# sourceMappingURL=propietario(a)-autoadmin.d.ts.map