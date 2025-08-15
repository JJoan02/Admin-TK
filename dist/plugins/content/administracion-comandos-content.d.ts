export namespace adminCommandsContent {
    export namespace _delete {
        let description: string;
        let noHash: string;
        let locked: string;
        let success: string;
        function notFound(hash: any): string;
        let error: string;
    }
    export { _delete as delete };
    export namespace list {
        let description_1: string;
        export { description_1 as description };
        export let noCommands: string;
        export let header: string;
        export let info: string;
        export let separator: string;
        export function commandLine(index: any, key: any, value: any): string;
        let error_1: string;
        export { error_1 as error };
    }
    export namespace set {
        let description_2: string;
        export { description_2 as description };
        export let noQuotedMessage: string;
        export let noCommandName: string;
        let locked_1: string;
        export { locked_1 as locked };
        export function success_1(commandName: any): string;
        export { success_1 as success };
        let error_2: string;
        export { error_2 as error };
    }
}
//# sourceMappingURL=administracion-comandos-content.d.ts.map