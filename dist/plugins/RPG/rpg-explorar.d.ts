export default handler;
declare function handler(m: any, { conn, text, command }: {
    conn: any;
    text: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let tags: string[];
    let help: string[];
    let command: string[];
    let register: boolean;
    let group: boolean;
}
//# sourceMappingURL=rpg-explorar.d.ts.map