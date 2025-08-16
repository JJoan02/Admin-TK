export declare class PermissionValidator {
    #private;
    constructor(rolePermissions?: {});
    /**
     * Verifica si un rol tiene permiso para ejecutar una acción (comando).
     * @param {string} userRole - El rol del usuario (ej. 'user', 'group_admin', 'owner').
     * @param {string} action - La acción o comando a verificar.
     * @returns {boolean} True si tiene permiso, false en caso contrario.
     */
    hasPermission(userRole: any, action: any): boolean;
    /**
     * Actualiza los permisos de los roles.
     * @param {object} newPermissions - Nuevo objeto de permisos.
     */
    updatePermissions(newPermissions: any): void;
}
export default PermissionValidator;
//# sourceMappingURL=PermissionValidator.d.ts.map