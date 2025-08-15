export const AUTODETECT_GROUP_NAME_CHANGED = (user, newName) => `*El nombre del grupo ha sido cambiado por ${user} a:* ${newName}`;
export const AUTODETECT_GROUP_PHOTO_CHANGED = (user) => `*La foto del grupo ha sido cambiada por ${user}*`;
export const AUTODETECT_GROUP_LINK_RESET = (user) => `*El enlace del grupo ha sido restablecido por ${user}*`;
export const AUTODETECT_GROUP_SETTINGS_ADJUSTED = (user, setting) => `*La configuración del grupo ha sido ajustada por ${user}. Ahora está ${setting}*`;
export const AUTODETECT_GROUP_STATUS_CHANGED = (user, status) => `*El estado del grupo ha sido cambiado por ${user}. Ahora está ${status}*`;
export const AUTODETECT_ADMIN_PROMOTED = (promoter, promoted) => `*${promoter} ha promovido a ${promoted} a administrador.*`;
export const AUTODETECT_ADMIN_DEMOTED = (demoter, demoted) => `*${demoter} ha degradado a ${demoted} de administrador.*`;
//# sourceMappingURL=autodetect-responses.js.map