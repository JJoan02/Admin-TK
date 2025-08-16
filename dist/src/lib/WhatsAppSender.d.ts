export declare class WhatsAppSender {
    /** @type {import('@whiskeysockets/baileys').WASocket} */
    sock: any;
    /**
     * @param {import('@whiskeysockets/baileys').WASocket} sock - La instancia del socket de Baileys.
     */
    constructor(sock: any);
    /**
     * Envía un mensaje de texto simple.
     * @param {string} jid - El JID del destinatario.
     * @param {string} text - El texto del mensaje.
     * @param {import('@whiskeysockets/baileys').proto.WebMessageInfo} [quoted] - Mensaje al que se responde.
     * @param {object} [options={}] - Opciones adicionales para sendMessage.
     * @returns {Promise<import('@whiskeysockets/baileys').proto.WebMessageInfo>}
     */
    sendText(jid: any, text: string | undefined, quoted: any, options?: {}): Promise<any>;
    /**
     * Envía un archivo multimedia (imagen, video, audio, documento) con detección automática de tipo.
     * @param {string} jid - El JID del destinatario.
     * @param {string|Buffer} path - La ruta o Buffer del archivo.
     * @param {string} [filename=''] - Nombre del archivo.
     * @param {string} [caption=''] - Pie de foto/descripción.
     * @param {import('@whiskeysockets/baileys').proto.WebMessageInfo} [quoted] - Mensaje al que se responde.
     * @param {boolean} [ptt=false] - Si es un audio como "Push To Talk" (grabación de voz).
     * @param {object} [options={}] - Opciones adicionales para sendMessage.
     * @returns {Promise<import('@whiskeysockets/baileys').proto.WebMessageInfo>}
     */
    sendFile(jid: any, path: any, filename: string | undefined, caption: string | undefined, quoted: any, ptt?: boolean, options?: {}): Promise<any>;
    /**
     * Envía un mensaje de contacto (vCard).
     * @param {string} jid - El JID del destinatario.
     * @param {Array<[string, string]>} data - Array de [número, nombre].
     * @param {import('@whiskeysockets/baileys').proto.WebMessageInfo} [quoted] - Mensaje al que se responde.
     * @param {object} [options={}] - Opciones adicionales para sendMessage.
     * @returns {Promise<import('@whiskeysockets/baileys').proto.WebMessageInfo>}
     */
    sendContact(jid: any, data: any, quoted: any, options?: {}): Promise<any>;
    /**
     * Envía un mensaje con botones.
     * @param {string} jid - El JID del destinatario.
     * @param {string} text - El texto del mensaje.
     * @param {string} footer - El pie de página del mensaje.
     * @param {Buffer} [buffer] - Buffer de imagen/video para el mensaje con medios.
     * @param {Array<[string, string]>} buttons - Array de botones [[displayText, buttonId]].
     * @param {import('@whiskeysockets/baileys').proto.WebMessageInfo} [quoted] - Mensaje al que se responde.
     * @param {object} [options={}] - Opciones adicionales para sendMessage.
     * @returns {Promise<import('@whiskeysockets/baileys').proto.WebMessageInfo>}
     */
    sendButton(jid: any, text: string | undefined, footer: string | undefined, buffer: any, buttons: any, quoted: any, options?: {}): Promise<any>;
    /**
     * Envía un mensaje hidratado (interactivo).
     * @param {string} jid - El JID del destinatario.
     * @param {string} text - El texto principal.
     * @param {string} footer - El pie de página.
     * @param {Buffer} [buffer] - Buffer de imagen/video para el mensaje con medios.
     * @param {string|string[]} [url] - URL para botón.
     * @param {string|string[]} [urlText] - Texto para URL.
     * @param {string|string[]} [call] - Número para botón de llamada.
     * @param {string|string[]} [callText] - Texto para botón de llamada.
     * @param {Array<[string, string]>} buttons - Array de botones de respuesta rápida [[displayText, buttonId]].
     * @param {import('@whiskeysockets/baileys').proto.WebMessageInfo} [quoted] - Mensaje al que se responde.
     * @param {object} [options={}] - Opciones adicionales para sendMessage.
     * @returns {Promise<import('@whiskeysockets/baileys').proto.WebMessageInfo>}
     */
    sendHydrated(jid: any, text: string | undefined, footer: string | undefined, buffer: any, url: any, urlText: any, call: any, callText: any, buttons: any, quoted: any, options?: {}): Promise<any>;
}
export default WhatsAppSender;
//# sourceMappingURL=WhatsAppSender.d.ts.map