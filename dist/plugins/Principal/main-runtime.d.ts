export default handler;
declare function handler(m: any, { usedPrefix, command }: {
    usedPrefix: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
}
//# sourceMappingURL=main-runtime.d.ts.map