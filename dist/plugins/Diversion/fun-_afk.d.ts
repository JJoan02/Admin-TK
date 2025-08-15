export default handler;
declare function handler(m: any, { text }: {
    text: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let money: number;
}
//# sourceMappingURL=fun-_afk.d.ts.map