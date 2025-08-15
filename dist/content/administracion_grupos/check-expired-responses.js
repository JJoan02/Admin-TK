export const CHECK_EXPIRED_NOT_SET = "Este grupo no tiene una fecha de caducidad establecida.";
export const CHECK_EXPIRED_NOT_SET_TARGET = (chatId) => `El chat ${chatId} no tiene una fecha de caducidad establecida.`;
export const CHECK_EXPIRED_EXPIRED = "Este grupo ya ha caducado.";
export const CHECK_EXPIRED_EXPIRES_IN = (formattedTime) => `Este grupo caducará en ${formattedTime}.`;
export const CHECK_EXPIRED_ERROR = "Ocurrió un error al verificar la caducidad del grupo.";
export const msToDate = (ms) => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    let result = '';
    if (days > 0)
        result += `${days} días `;
    if (hours > 0)
        result += `${hours} horas `;
    if (minutes > 0)
        result += `${minutes} minutos `;
    if (seconds > 0)
        result += `${seconds} segundos`;
    return result.trim();
};
//# sourceMappingURL=check-expired-responses.js.map