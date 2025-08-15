export default handler;
declare function handler(m: any, { conn, text, usedPrefix, command }: {
    conn: any;
    text: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    export let tags: string[];
    export let help: string[];
    export let command: RegExp;
    export let register: boolean;
    let _private: boolean;
    export { _private as private };
}
//# sourceMappingURL=confesiones-respuesta_ngl.d.ts.map