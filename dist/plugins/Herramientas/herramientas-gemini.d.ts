export default handler;
declare function handler(m: any, { text, usedPrefix, command }: {
    text: any;
    usedPrefix: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let command: string[];
    let help: string[];
    let tags: string[];
    let premium: boolean;
}
//# sourceMappingURL=herramientas-gemini.d.ts.map