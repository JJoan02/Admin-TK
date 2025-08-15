export default handler;
declare function handler(m: any, { conn, usedPrefix: _p }: {
    conn: any;
    usedPrefix: any;
}): Promise<void>;
declare namespace handler {
    export let help: string[];
    export let tags: string[];
    export let command: RegExp;
    export let owner: boolean;
    export let mods: boolean;
    export let premium: boolean;
    export let group: boolean;
    let _private: boolean;
    export { _private as private };
    export let admin: boolean;
    export let botAdmin: boolean;
    export let fail: any;
}
//# sourceMappingURL=info-sc.d.ts.map