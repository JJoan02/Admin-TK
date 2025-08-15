export const WARN_USAGE_MESSAGE = (usedPrefix, command, suittag) => `*[❗] ETIQUETE A UNA PERSONA O RESPONDA A UN MENSAJE DEL GRUPO PARA ADVERTIR AL USUARIO*\n\n*—◉ EJEMPLO:*\n*${usedPrefix + command} @${suittag}*`;
export const WARN_SUCCESS_MESSAGE = (who, reason, warnCount) => `*@${who.split('@')[0]}* RECIBIÓ UNA ADVERTENCIA EN ESTE GRUPO!\nMotivo: ${reason}\n*ADVERTENCIAS ${warnCount}/3*`;
export const WARN_RESTRICT_DISABLED = '*[❗] EL PROPIETARIO DEL BOT NO TIENE HABILITADO LAS RESTRICCIONES (#enable restrict) CONTACTE CON EL PARA QUE LO HABILITE*';
export const WARN_REMOVED_MESSAGE = (who) => `¡TE LO ADVERTÍ VARIAS VECES!!\n*@${who.split('@')[0]}* SUPERASTE LAS *3* ADVERTENCIAS, AHORA SERÁS ELIMINADO/A 👽`;
export const WARN_DEFAULT_REASON = 'No especificado';
export const WARN_BOT_MENTIONED = "No puedo advertirme a mí mismo.";
export const WARN_ERROR_MESSAGE = "Ocurrió un error al procesar la advertencia.";
export const WARN_LIST_HEADER = "⚠️ USUARIOS ADVERTIDOS";
export const WARN_LIST_TOTAL_USERS = (total) => `*Total : ${total} Usuarios*`;
export const WARN_LIST_USER_DETAIL = (index, name, warnCount, isOwner, jid) => {
    const mention = isOwner ? `@${jid.split('@')[0]}` : jid;
    return `*${index}.* ${name} *(${warnCount}/4)*\n${mention}\n- - - - - - - - -`;
};
export const WARN_LIST_NO_USERS = "Sin Usuarios";
export const WARN_LIST_WARNING_COUNT = (warns) => `⚠️ ADVERTENCIA ⇢ *${warns}/4*`;
export const WARN_LIST_ERROR = "Ocurrió un error al listar las advertencias.";
//# sourceMappingURL=advertencia-responses.js.map