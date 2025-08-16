// src/utils/PermissionValidator.js

import { initializeLogger } from './logger.js';
const logger = initializeLogger();
import { roleHierarchy } from './auth.js'; // Importar la jerarquía de roles

export class PermissionValidator {
  #rolePermissions;

  constructor(rolePermissions = {}) {
    this.#rolePermissions = rolePermissions;
    logger.info('🔒 PermissionValidator inicializado.');
  }

  /**
   * Verifica si un rol tiene permiso para ejecutar una acción (comando).
   * @param {string} userRole - El rol del usuario (ej. 'user', 'group_admin', 'owner').
   * @param {string} action - La acción o comando a verificar.
   * @returns {boolean} True si tiene permiso, false en caso contrario.
   */
  hasPermission(userRole, action) {
    const normalizedUserRole = userRole.toLowerCase();
    const userLevel = roleHierarchy[normalizedUserRole];

    if (userLevel === undefined) {
      logger.warn(`Permisos: Rol de usuario desconocido: ${userRole}. Denegando acción: ${action}.`);
      return false;
    }

    // Iterar a través de la jerarquía de roles, desde el rol del usuario hacia arriba
    for (const role in roleHierarchy) {
      if (roleHierarchy[role] <= userLevel) {
        // Si el rol actual en la jerarquía tiene permisos definidos
        if (this.#rolePermissions[role] && this.#rolePermissions[role].includes(action)) {
          logger.debug(`Permiso concedido: Rol '${userRole}' tiene permiso para '${action}' a través de '${role}'.`);
          return true;
        }
      }
    }

    // Si no se encontró el permiso en ningún nivel de la jerarquía, denegar
    logger.debug(`Permiso denegado: Rol '${userRole}' no tiene permiso para '${action}'.`);
    return false;
  }

  /**
   * Actualiza los permisos de los roles.
   * @param {object} newPermissions - Nuevo objeto de permisos.
   */
  updatePermissions(newPermissions) {
    this.#rolePermissions = newPermissions;
    logger.info('Permisos de roles actualizados.');
  }
}

export default PermissionValidator;
