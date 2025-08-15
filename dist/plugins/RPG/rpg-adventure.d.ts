export default handler;
declare function handler(m: any, { usedPrefix, conn }: {
    usedPrefix: any;
    conn: any;
}): Promise<any>;
declare namespace handler {
    export let help: string[];
    export let tags: string[];
    export let command: RegExp;
    export let register: boolean;
    export { cooldown };
    export let disabled: boolean;
}
declare const cooldown: 1500000;
//# sourceMappingURL=rpg-adventure.d.ts.map