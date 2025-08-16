declare function handler(m: any, { usedPrefix, command }: {
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    export var help: string[];
    export var tags: string[];
    export var command: string[];
    var _a: boolean;
    export { _a as private };
}
export default handler;
//# sourceMappingURL=search-start.d.ts.map