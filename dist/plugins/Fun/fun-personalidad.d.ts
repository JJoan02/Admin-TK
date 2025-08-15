export default handler;
declare function handler(m: any, { conn, command, text }: {
    conn: any;
    command: any;
    text: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let register: boolean;
}
//# sourceMappingURL=fun-personalidad.d.ts.map