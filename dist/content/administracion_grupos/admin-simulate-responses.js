export const ADMIN_SIMULATE_WELCOME_NOT_ENABLED = (usedPrefix) => `⚠️ Para usar este comando debe activar las Bienvenidas con *${usedPrefix}on* welcome`;
export const ADMIN_SIMULATE_EVENT_LIST = (usedPrefix, command) => `
    ┌─⊷ *EVENTOS*
    ▢ welcome
    ▢ bye
    ▢ promote 
    ▢ demote
    └───────────
    
    📌 Ejemplo :
    
    *${usedPrefix + command}* welcome @user`;
export const ADMIN_SIMULATE_SIMULATING = (event) => `✅ Simulando ${event}...`;
export const ADMIN_SIMULATE_INVALID_EVENT = "error, ingrese una opcion valida";
//# sourceMappingURL=admin-simulate-responses.js.map