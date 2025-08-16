export declare class MessageBufferService {
    constructor();
    /**
     * Agrega mensaje al buffer y programa/envía según condiciones
     * @param {string} chatJid - ID del chat
     * @param {object} message - { content: string, isMedia: boolean }
     * @param {function} sendCallback - Función de envío (content: string) => Promise<void>
     */
    addMessage(chatJid: any, message: any, sendCallback: any): void;
    /**
     * Vacía inmediatamente el buffer de un chat específico
     * @param {string} chatJid - ID del chat
     * @param {function} sendCallback - Función de envío
     */
    flushBuffer(chatJid: any, sendCallback: any): void;
    /**
     * Vacía todos los buffers activos
     * @param {function} sendCallback - Función de envío
     */
    flushAllBuffers(sendCallback: any): void;
    /**
     * Maneja envio inmediato para contenidos especiales
     * @private
     */
    _handleImmediateSend(content: any, sendCallback: any): void;
    /**
     * Determina si un mensaje requiere envio inmediato
     * @private
     */
    _isUrgentMessage(content: any): boolean;
}
declare const _default: MessageBufferService;
export default _default;
//# sourceMappingURL=MessageBufferService.d.ts.map