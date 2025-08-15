export const afkMessages = {
    returned: (timeString) => `🚩 Dejaste de estar *AFK* despues de *${timeString}.*`,
    mentioned: (reason, timeString) => `🚩 El usuario que intentas etiquetar esta *AFK* por la razón *${reason ? reason : '...'}* durante *${timeString}.*`,
    setAfk: (userName, reason) => `🚩 Ahora estás ausente hasta que vuelvas a enviar un nuevo mensaje, cuando te intenten tagear el usuario será notificado de tu ausencia con el motivo.\n\n*${userName}* Esta AFK, Motivo *${reason ? ': ' + reason : ''}*`,
};
//# sourceMappingURL=afk-content.js.map