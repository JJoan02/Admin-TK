/**
 * El corazón del sistema de logging. Procesa y formatea todos los eventos de Baileys.
 * @param {string} event - El nombre del evento.
 * @param {any} data - Los datos asociados al evento.
 * @param {object} context - El contexto adicional (user, chat, group, sock).
 */
declare const logEvent: (event: any, data: any, context?: {}) => Promise<void>;
export default logEvent;
//# sourceMappingURL=print.d.ts.map