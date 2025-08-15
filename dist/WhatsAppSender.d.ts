declare class WhatsAppSender {
    sock: any;
    constructor(sock: any);
    sendText(jid: any, text: string | undefined, quoted: any, options?: {}): Promise<any>;
    sendFile(jid: any, path: any, filename: string | undefined, caption: string | undefined, quoted: any, ptt?: boolean, options?: {}): Promise<any>;
    sendContact(jid: any, data: any, quoted: any, options?: {}): Promise<any>;
    sendButton(jid: any, text: string | undefined, footer: string | undefined, buffer: any, buttons: any, quoted: any, options?: {}): Promise<any>;
    sendHydrated(jid: any, text: string | undefined, footer: string | undefined, buffer: any, url: any, urlText: any, call: any, callText: any, buttons: any, quoted: any, options?: {}): Promise<any>;
}
export default WhatsAppSender;
//# sourceMappingURL=WhatsAppSender.d.ts.map