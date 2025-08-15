export namespace urlShortenerMessages {
    let noLink: string;
    function success(originalUrl: any, shortUrl: any): string;
    function error(usedPrefix: any, command: any): string;
}
export namespace calculatorMessages {
    let cheatDetected: string;
    let noExpression: string;
    let invalidFormat: string;
    function result(format: any, result: any): string;
}
export namespace chatGptMessages {
    export function noText(usedPrefix: any, command: any): string;
    export function error_1(usedPrefix: any, command: any): string;
    export { error_1 as error };
    export let noResponse: string;
}
export namespace deleteMessages {
    export let noTarget: string;
    export let mentionOrReplyRequired: string;
    export let noRecentMessages: string;
    export function success_1(deletedCount: any, targetType: any, targetValue: any): string;
    export { success_1 as success };
    let error_2: string;
    export { error_2 as error };
}
export namespace fakeReplyMessages {
    export function usage(usedPrefix: any, command: any, senderMention: any): string;
    export function mentionRequired(usedPrefix: any, command: any, senderMention: any): string;
    let error_3: string;
    export { error_3 as error };
}
export namespace geminiMessages {
    export function noText_1(usedPrefix: any, command: any): string;
    export { noText_1 as noText };
    export function error_4(usedPrefix: any, command: any): string;
    export { error_4 as error };
}
export namespace getBioMessages {
    export function error_5(errorMessage: any): string;
    export { error_5 as error };
    export function bioInfo(user: any, status: any, setAt: any): string;
}
export namespace imageEnhanceMessages {
    export function noImage(usedPrefix: any, command: any): string;
    export function invalidFormat_1(mime: any): string;
    export { invalidFormat_1 as invalidFormat };
    export let processing: string;
    let success_2: string;
    export { success_2 as success };
    let error_6: string;
    export { error_6 as error };
}
export namespace whatsappInspectorMessages {
    let noLink_1: string;
    export { noLink_1 as noLink };
    export let groupNotFound: string;
    export let channelNotFound: string;
    export let botNotAdminChannel: string;
    export let title: string;
    export let channelTitle: string;
    export function groupInfo(res: any, pp: any, inviteCode: any, formatDate: any, formatParticipants: any): string;
}
//# sourceMappingURL=herramientas-content.d.ts.map