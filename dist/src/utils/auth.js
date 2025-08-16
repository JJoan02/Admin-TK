import { initializeLogger } from './logger.js';
const logger = initializeLogger();
export const roleHierarchy = {
    'user': 1,
    'group_admin': 2,
    'owner': 3, // Cambiado a minúsculas
    // 'bot': 4, // No es un rol de usuario para permisos
};
export class Auth {
    static hasMinRole(userRole, requiredRole) {
        const userLevel = roleHierarchy[userRole.toLowerCase()];
        const requiredLevel = roleHierarchy[requiredRole.toLowerCase()];
        if (userLevel === undefined) {
            logger.warn(`Rol de usuario desconocido: ${userRole}. Denegando permiso.`);
            return false;
        }
        if (requiredLevel === undefined) {
            logger.warn(`Rol requerido desconocido: ${requiredRole}. Denegando permiso.`);
            return false;
        }
        return userLevel >= requiredLevel;
    }
    static isOwner(userRole) {
        return userRole.toLowerCase() === 'owner';
    }
}
export default Auth;
//# sourceMappingURL=auth.js.map