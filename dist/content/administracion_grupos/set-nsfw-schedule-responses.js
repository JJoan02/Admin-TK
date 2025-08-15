export const SET_NSFW_SCHEDULE_NO_TIME = (prefix, command) => `Debe ingresar un horario de inicio y fin. Ejemplo: ${prefix + command} 08:00-20:00`;
export const SET_NSFW_SCHEDULE_WRONG_FORMAT = (prefix, command) => `Formato de horario incorrecto. Use HH:MM-HH:MM, HH:MM a HH:MM o HH:MM,HH:MM. Ejemplo: ${prefix + command} 08:00-20:00`;
export const SET_NSFW_SCHEDULE_SUCCESS = (startTime, endTime) => `Horario NSFW configurado correctamente de ${startTime} a ${endTime}.`;
export const SET_NSFW_SCHEDULE_ERROR = "Error al configurar el horario NSFW.";
//# sourceMappingURL=set-nsfw-schedule-responses.js.map