export default handler;
declare function handler(m: any, { command }: {
    command: any;
}): Promise<void>;
declare namespace handler {
    let command: string[];
    let tags: string[];
    let help: string[];
}
//# sourceMappingURL=tools-feo.d.ts.map