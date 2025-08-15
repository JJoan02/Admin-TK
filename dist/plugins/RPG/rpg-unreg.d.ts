export default handler;
declare function handler(m: any, { args }: {
    args: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let register: boolean;
}
//# sourceMappingURL=rpg-unreg.d.ts.map