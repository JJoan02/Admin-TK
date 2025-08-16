/**
 * Limpia las sesiones de WhatsApp inactivas o antiguas.
 * Una sesión se considera inactiva si su archivo 'creds.json'
 * no ha sido modificado en MAX_INACTIVITY_DAYS.
 * La sesión activa del bot no será eliminada.
 * @param {string} currentSessionId - El ID de la sesión activa del bot.
 */
export declare const cleanInactiveSessions: (currentSessionId: any) => Promise<void>;
//# sourceMappingURL=sessionCleanup.d.ts.map