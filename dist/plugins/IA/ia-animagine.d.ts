export default yeon;
declare function yeon(m: any, { conn, text, usedPrefix, command }: {
    conn: any;
    text: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace yeon {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let register: boolean;
    let limit: boolean;
}
//# sourceMappingURL=ia-animagine.d.ts.map