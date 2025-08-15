export default handler;
declare function handler(m: any, { text }: {
    text: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
}
//# sourceMappingURL=owner-setbaner.d.ts.map