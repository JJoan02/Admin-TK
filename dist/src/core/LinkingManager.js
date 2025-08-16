// src/core/LinkingManager.js
import { askQuestion, sleep } from '../utils/helpers.js';
import cfonts from 'cfonts';
export class LinkingManager {
    #connectionManager;
    #sessionManager;
    #logger;
    constructor(connectionManager, sessionManager, logger) {
        this.#connectionManager = connectionManager;
        this.#sessionManager = sessionManager;
        this.#logger = logger;
    }
    async start() {
        let sock = null;
        while (!sock) {
            try {
                console.clear(); // Limpiar consola al inicio de cada intento de vinculación
                cfonts.say('Admin-TK|Linker', { font: 'block', align: 'center', colors: ['cyan', 'white'] });
                const sessionId = await this.#getSessionIdFromMenu();
                // Si el usuario elige salir, sessionId será null
                if (!sessionId) {
                    this.#logger.info('Proceso de vinculación cancelado por el usuario.');
                    process.exit(0);
                }
                const linkingMethod = await this.#showLinkingMethodMenu();
                const phoneNumber = linkingMethod === 'code' ? await this.#getPhoneNumber() : null;
                this.#logger.info(`Iniciando conexión para la sesión: '${sessionId}' usando el método: '${linkingMethod}'`);
                sock = await this.#connectionManager.connect({
                    sessionId,
                    method: linkingMethod,
                    phoneNumber,
                });
            }
            catch (error) {
                this.#logger.error(`Ocurrió un error durante el proceso de vinculación: ${error.message}`);
                if (error.message.includes('Logged Out')) {
                    const sessionIdToDelete = error.sessionId;
                    if (sessionIdToDelete) {
                        this.#logger.warn(`La sesión '${sessionIdToDelete}' es inválida. Eliminándola...`);
                        await this.#sessionManager.deleteSession(sessionIdToDelete);
                        this.#logger.info('Sesión corrupta eliminada. Volviendo al menú...');
                    }
                }
                else if (error.message.includes('Conexión fallida después de')) {
                    this.#logger.error('La conexión falló repetidamente. Por favor, verifica tu conexión a internet o el estado de tu cuenta de WhatsApp.');
                }
                else {
                    this.#logger.error('Error inesperado. Asegúrate de que tu conexión a internet sea estable y que tu número de WhatsApp sea válido.');
                }
                await sleep(3000); // Esperar antes de reintentar o mostrar el menú de nuevo
            }
        }
        return sock;
    }
    async #getSessionIdFromMenu() {
        const availableSessions = await this.#sessionManager.listSessions();
        console.clear(); // Limpiar antes de mostrar el menú de sesiones
        cfonts.say('Admin-TK|Sessions', { font: 'block', align: 'center', colors: ['green', 'white'] });
        if (availableSessions.length > 0) {
            return this.#showExistingSessionsMenu(availableSessions);
        }
        else {
            this.#logger.info('No se encontraron sesiones existentes. Creando una nueva.');
            return this.#getNewSessionId();
        }
    }
    async #showExistingSessionsMenu(sessions) {
        this.#logger.info('Se encontraron las siguientes sesiones:');
        sessions.forEach((s, i) => this.#logger.info(`  ${i + 1}️⃣  ${s}`));
        this.#logger.info(`  ${sessions.length + 1}️⃣  Crear una nueva sesión`);
        let choice = -1;
        while (choice < 1 || choice > sessions.length + 1) {
            const answer = await askQuestion('Elige una opción:');
            choice = parseInt(answer, 10);
        }
        if (choice === sessions.length + 1)
            return this.#getNewSessionId();
        return sessions[choice - 1];
    }
    async #getNewSessionId() {
        let sessionId = '';
        while (!sessionId.match(/^[a-zA-Z0-9_-]+$/)) {
            sessionId = await askQuestion('Introduce un nombre para la nueva sesión (ej: mi-bot-principal):');
        }
        return sessionId;
    }
    async #showLinkingMethodMenu() {
        console.clear(); // Limpiar antes de mostrar el menú de métodos
        cfonts.say('Admin-TK|Method', { font: 'block', align: 'center', colors: ['blue', 'white'] });
        this.#logger.info('Elige un método de vinculación:');
        this.#logger.info('  1️⃣  Código QR (Recomendado)');
        this.#logger.info('  2️⃣  Código de 8 dígitos');
        let choice = '';
        while (choice !== '1' && choice !== '2') {
            choice = await askQuestion('Elige una opción (1 o 2):');
        }
        return choice === '1' ? 'qr' : 'code';
    }
    async #getPhoneNumber() {
        let phoneNumber = '';
        while (!phoneNumber.match(/^\d{10,15}$/)) {
            phoneNumber = await askQuestion('Introduce tu número de WhatsApp (ej: 51918755472):');
        }
        return phoneNumber;
    }
}
export default LinkingManager;
//# sourceMappingURL=LinkingManager.js.map