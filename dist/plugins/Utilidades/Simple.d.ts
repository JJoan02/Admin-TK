export function serialize(conn: any, m: any, options?: {}): any;
export class WAConnection {
    constructor(conn: any);
    serializeM(m: any): Promise<any>;
    parseMention(text: any): string[];
    sendText(id: any, text: any, quoted?: any, options?: any): Promise<void>;
    downloadMediaMessage(message: any, fileName: any): Promise<void | Buffer<ArrayBuffer>>;
    downloadAndSaveMediaMessage(message: any, filename: any, attachExtension?: any): Promise<any>;
    getFile(PATH: any, save: any): Promise<any>;
    sendFile(jid: any, PATH: any, fileName: any, quoted?: any, options?: any): Promise<void>;
    groupQueryInvite(code: any): Promise<void>;
}
//# sourceMappingURL=Simple.d.ts.map