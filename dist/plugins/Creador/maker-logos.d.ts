export default handler;
declare function handler(m: any, { conn, args: [effect], text: txt, usedPrefix, command, name }: {
    conn: any;
    args: [any];
    text: any;
    usedPrefix: any;
    command: any;
    name: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let limit: number;
    let register: boolean;
}
//# sourceMappingURL=maker-logos.d.ts.map