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
    let botAdmin: boolean;
    let register: boolean;
}
//# sourceMappingURL=grupo-pin.d.ts.map