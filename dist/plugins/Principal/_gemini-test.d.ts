export default handler;
declare function handler(m: any, { text, usedPrefix, command, conn }: {
    text: any;
    usedPrefix: any;
    command: any;
    conn: any;
}): Promise<any>;
declare namespace handler {
    let command: string[];
    let help: string[];
    let tags: string[];
    let group: boolean;
}
//# sourceMappingURL=_gemini-test.d.ts.map