// src/queryHandlers/GetUserQueryHandler.js
import { GetUserQuery } from '../queries/GetUserQuery.js';
export export class GetUserQueryHandler {
    #userManager;
    #logger;
    constructor(userManager, logger) {
        this.#userManager = userManager;
        this.#logger = logger;
    }
    async handle(query) {
        if (!(query instanceof GetUserQuery)) {
            throw new Error('Consulta inválida para GetUserQueryHandler.');
        }
        this.#logger.info(`Ejecutando GetUserQuery para usuario: ${query.userId}`);
        const user = await this.#userManager.getUser(query.userId); // Asumiendo que getUser puede tomar solo el userId
        if (!user) {
            this.#logger.warn(`Usuario ${query.userId} no encontrado.`);
            return null;
        }
        this.#logger.info(`Usuario ${query.userId} encontrado.`);
        return user;
    }
}
//# sourceMappingURL=GetUserQueryHandler.js.map