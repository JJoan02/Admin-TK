export const ADD_PARTICIPANT_NO_TARGET = "Por favor, proporciona el número del miembro a añadir (ej: 54911... o @usuario).";
export const ADD_PARTICIPANT_NO_PLUS = "Ingrese el número todo junto sin el +.";
export const ADD_PARTICIPANT_INVALID_NUMBER = "Ingrese solo números más su código de país sin espacios.";
export const ADD_PARTICIPANT_RESTRICT = (smsAvisoAG, smsSoloOwner) => `${smsAvisoAG}${smsSoloOwner}`;
export const ADD_PARTICIPANT_INVITE_MESSAGE = (groupLink, smsAdd) => `${smsAdd}\n\n${groupLink}`;
export const ADD_PARTICIPANT_INVITE_SENT = (targetNumber) => `Se envió un enlace de invitación al usuario ${targetNumber}`;
export const ADD_PARTICIPANT_ADDED = (targetNumber, smsAdd2) => `*@${targetNumber}*\n${smsAdd2}`;
export const ADD_PARTICIPANT_ADD_ERROR = (targetNumber, status) => `No se pudo añadir al miembro ${targetNumber}. Estado: ${status}`;
export const ADD_PARTICIPANT_ERROR = "Ocurrió un error al intentar añadir al miembro.";
//# sourceMappingURL=add-participant-responses.js.map