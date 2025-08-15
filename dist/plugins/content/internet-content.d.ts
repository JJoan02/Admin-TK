export namespace googleSearchMessages {
    let noText: string;
    let processing: string;
    function resultHeader(text: any): string;
    function resultItem(title: any, snippet: any, link: any): string;
}
export namespace mercadoLibreSearchMessages {
    function invalidFormat(usedPrefix: any, command: any): string;
    let header: string;
    function item(title: any, state: any, link: any): string;
    let separator: string;
}
export namespace npmSearchMessages {
    export function noText_1(usedPrefix: any, command: any): string;
    export { noText_1 as noText };
    let processing_1: string;
    export { processing_1 as processing };
    export function noResult(text: any): string;
    let resultHeader_1: string;
    export { resultHeader_1 as resultHeader };
    export function resultItem_1(name: any, version: any, link: any, description: any): string;
    export { resultItem_1 as resultItem };
    export let error: string;
}
//# sourceMappingURL=internet-content.d.ts.map