export default handler;
declare function handler(m: any, { usedPrefix, command }: {
    usedPrefix: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let command: string[];
    let help: string[];
    let tags: string[];
    let rowner: boolean;
}
//# sourceMappingURL=owner-rev.d.ts.map