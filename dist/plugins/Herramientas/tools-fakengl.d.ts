export default keni;
declare function keni(m: any, { conn, text, usedPrefix, command }: {
    conn: any;
    text: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace keni {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let register: boolean;
    let limit: boolean;
}
//# sourceMappingURL=tools-fakengl.d.ts.map