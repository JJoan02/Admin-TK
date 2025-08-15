export default handler;
declare function handler(m: any, { text }: {
    text: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let rowner: boolean;
}
//# sourceMappingURL=owner-fetch.d.ts.map