export const WARN_USAGE_MESSAGE = (usedPrefix, command, suittag) => `*[❗] ETIQUETE A UNA PERSONA O RESPONDA A UN MENSAJE DEL GRUPO PARA ADVERTIR AL USUARIO*\n\n*—◉ EJEMPLO:*\n*${usedPrefix + command} @${suittag}*`;
export const WARN_SUCCESS_MESSAGE = (who, reason, warnCount) => `*@${who.split('@')[0]}* RECIBIÓ UNA ADVERTENCIA EN ESTE GRUPO!\nMotivo: ${reason}\n*ADVERTENCIAS ${warnCount}/3*`;
export const WARN_RESTRICT_DISABLED = '*[❗] EL PROPIETARIO DEL BOT NO TIENE HABILITADO LAS RESTRICCIONES (#enable restrict) CONTACTE CON EL PARA QUE LO HABILITE*';
export const WARN_REMOVED_MESSAGE = (who) => `¡TE LO ADVERTÍ VARIAS VECES!!\n*@${who.split('@')[0]}* SUPERASTE LAS *3* ADVERTENCIAS, AHORA SERÁS ELIMINADO/A 👽`;
export const WARN_DEFAULT_REASON = 'No especificado';
export const WARN_BOT_MENTIONED = "No puedo advertirme a mí mismo.";
export const WARN_ERROR_MESSAGE = "Ocurrió un error al procesar la advertencia.";
//# sourceMappingURL=advertencia_grupo-responses.js.map