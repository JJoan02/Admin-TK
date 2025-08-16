/**
 * Un decorador o wrapper de orden superior para comandos que requieren contexto de administrador de grupo.
 * Realiza todas las validaciones comunes antes de ejecutar la lógica principal del comando.
 *
 * @param {function(object): Promise<void>} commandLogic - La lógica específica del comando a ejecutar.
 * @returns {function(object): Promise<void>} Una nueva función que envuelve la lógica del comando con validaciones.
 */
export declare function withGroupAdminContext(commandLogic: any): void;
/**
 * Procesa el resultado de una actualización de participantes de grupo (add, remove, promote, demote).
 * @param {Array<object>} result - El array de resultados de groupParticipantsUpdate.
 * @returns {{success: string[], failed: string[]}} Un objeto con arrays de números de teléfono exitosos y fallidos.
 */
export declare function processGroupUpdateResult(result: any): void;
//# sourceMappingURL=commandUtils.d.ts.map