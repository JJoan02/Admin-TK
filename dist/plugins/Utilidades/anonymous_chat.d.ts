export default handler;
declare function handler(m: any, { usedPrefix, command }: {
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare class handler {
    constructor(m: any, { usedPrefix, command }: {
        usedPrefix: any;
        command: any;
    });
    anonymous: {};
}
declare namespace handler {
    export let help: string[];
    export let tags: string[];
    export let command: string[];
    let _private: boolean;
    export { _private as private };
}
//# sourceMappingURL=anonymous_chat.d.ts.map