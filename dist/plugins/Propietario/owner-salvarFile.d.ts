export default handler;
declare function handler(m: any, { text, usedPrefix, command }: {
    text: any;
    usedPrefix: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    export let help: string[];
    export let tags: string[];
    export let command: string[];
    let _private: boolean;
    export { _private as private };
}
//# sourceMappingURL=owner-salvarFile.d.ts.map