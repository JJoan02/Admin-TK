declare function handler(m: any, { usedPrefix }: {
    usedPrefix: any;
}): Promise<void>;
declare namespace handler {
    export var help: string[];
    export var command: string[];
    export var tags: string[];
    var _a: boolean;
    export var register: boolean;
    export { _a as private };
}
export default handler;
//# sourceMappingURL=jadibot-token.d.ts.map