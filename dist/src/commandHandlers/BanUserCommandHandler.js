// src/commandHandlers/BanUserCommandHandler.js
import { BanUserCommand } from '../commands/BanUserCommand.js';
export export class BanUserCommandHandler {
    #userManager;
    #logger;
    constructor(userManager, logger) {
        this.#userManager = userManager;
        this.#logger = logger;
    }
    async handle(command) {
        if (!(command instanceof BanUserCommand)) {
            throw new Error('Comando inválido para BanUserCommandHandler.');
        }
        this.#logger.info(`Ejecutando BanUserCommand para usuario: ${command.userId} con razón: ${command.reason}`);
        await this.#userManager.banUser(command.userId, command.reason);
        this.#logger.info(`Usuario ${command.userId} baneado exitosamente.`);
        return { success: true, userId: command.userId };
    }
}
//# sourceMappingURL=BanUserCommandHandler.js.map