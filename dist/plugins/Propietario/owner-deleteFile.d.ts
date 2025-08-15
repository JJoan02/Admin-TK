export default handler;
declare function handler(m: any, { conn, usedPrefix: _p, __dirname, args, text }: {
    conn: any;
    usedPrefix: any;
    __dirname: any;
    args: any;
    text: any;
}): Promise<any>;
declare namespace handler {
    export let help: string[];
    export let tags: string[];
    export let command: RegExp;
    export let rowner: boolean;
    let _private: boolean;
    export { _private as private };
}
//# sourceMappingURL=owner-deleteFile.d.ts.map