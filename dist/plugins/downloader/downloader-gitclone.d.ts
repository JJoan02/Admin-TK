export default handler;
declare function handler(m: any, { args, usedPrefix, command }: {
    args: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let register: boolean;
}
//# sourceMappingURL=downloader-gitclone.d.ts.map