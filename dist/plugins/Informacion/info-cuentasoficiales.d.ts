export default handler;
declare function handler(m: any, { conn, command }: {
    conn: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let command: string[];
    let exp: number;
    let register: boolean;
}
//# sourceMappingURL=info-cuentasoficiales.d.ts.map