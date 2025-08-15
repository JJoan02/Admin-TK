export const settingsMessages = {
    enableOption: '🚩 Ingresa una opción para habilitar o deshabilitar',
    optionListHeader: '*≡ Lista de opciones*',
    optionType: (type, description) => `*Tipo :* ${type}\n*Descripción :* ${description}`,
    example: (usedPrefix, command, type) => `*• Ejemplo:*\n*- ${usedPrefix + command}* ${type}`,
    featureToggled: (type, enabled, scope) => `La función *${type}* se *${enabled ? 'activó' : 'desactivó'}* ${scope}`,
    scopeBot: 'para este bot',
    scopeChat: 'para este chat',
    scopeUser: 'para el usuario',
    welcomeDescription: 'Des/Activa la *Bienvenida* y *Despedida* para Grupos',
    nsfwDescription: 'Des/Activa los comandos *NSFW* para Grupos',
    antiArabesDescription: 'Des/Activa el *AntiArabes* para Grupos',
    antilinkDescription: 'Des/Activa el *AntiLink* para Grupos',
    autoreadDescription: 'Des/Activa el *AutoRead* para el Bot',
    documentDescription: 'Des/Activa la *Descarga En Documentos* para el Usuario',
    helpMessage: `
*🧑‍💻 INGRESE UNA OPCIÓN PARA ACTIVAR O DESACTIVAR*

*🔖 LISTA DE OPCIONES*
*Tipo :* welcome
*Descripción :* Des/Activa la *Bienvenida* y *Despedida* para Grupos

*Tipo :* nsfw 
*Descripción :* Des/Activa los comandos *NSFW* para Grupos

*Tipo :* antilag
*Descripción :* Des/Activa el *AntiLag* en un grupo*
*Tipo :* antiarabes 
*Descripción :* Des/Activa el *AntiArabes* para Grupos

*Tipo :* antilink 
*Descripción :* Des/Activa el *AntiLink* para Grupos

*Tipo :* autoread 
*Descripción :* Des/Activa el *AutoRead* para el Bot

*Tipo :* restrict
*Description :* Des/Activa el *Restrict*
para el bot

*Tipo :* document 
*Descripción :* Des/Activa la *Descarga En Documentos* para el Usuario

*Tipo :* modoadmin
*Descripción :* Des/Activa la *modoadmin* para el Usuario

*Tipo :* audios
*Descripción :* Des/Activa la *audios* para el Usuario

*Tipo :* subbots
*Descripción :* Des/Activa la *subbots* para el Usuario


*• Ejemplo:*
*- ${usedPrefix}command* welcome
`.trim(),
};
//# sourceMappingURL=settings-content.js.map