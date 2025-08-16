// src/models/DashboardUser.js
import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();
export class DashboardUser {
    #dbService;
    constructor(dbService) {
        this.#dbService = dbService;
    }
    async create(username, hashedPassword, whatsappNumber = null, role = 'user') {
        try {
            const db = this.#dbService.getDB();
            const result = await db.run(`INSERT INTO dashboard_users (username, password, whatsapp_number, role) VALUES (?, ?, ?, ?)`, [username, hashedPassword, whatsappNumber, role]);
            logger.info(`DashboardUser creado: ${username}`);
            return result.lastID;
        }
        catch (error) {
            logger.error({ err: error }, 'Error al crear DashboardUser.');
            throw error;
        }
    }
    async findByUsername(username) {
        try {
            const db = this.#dbService.getDB();
            const user = await db.get(`SELECT * FROM dashboard_users WHERE username = ?`, [username]);
            return user;
        }
        catch (error) {
            logger.error({ err: error }, 'Error al buscar DashboardUser por username.');
            throw error;
        }
    }
    async findById(id) {
        try {
            const db = this.#dbService.getDB();
            const user = await db.get(`SELECT * FROM dashboard_users WHERE id = ?`, [id]);
            return user;
        }
        catch (error) {
            logger.error({ err: error }, 'Error al buscar DashboardUser por ID.');
            throw error;
        }
    }
    async updatePassword(userId, hashedPassword) {
        try {
            const db = this.#dbService.getDB();
            await db.run(`UPDATE dashboard_users SET password = ? WHERE id = ?`, [hashedPassword, userId]);
            logger.info(`Contraseña de DashboardUser ${userId} actualizada.`);
        }
        catch (error) {
            logger.error({ err: error }, 'Error al actualizar contraseña de DashboardUser.');
            throw error;
        }
    }
    async updateWhatsappNumber(userId, whatsappNumber) {
        try {
            const db = this.#dbService.getDB();
            await db.run(`UPDATE dashboard_users SET whatsapp_number = ? WHERE id = ?`, [whatsappNumber, userId]);
            logger.info(`Número de WhatsApp de DashboardUser ${userId} actualizado.`);
        }
        catch (error) {
            logger.error({ err: error }, 'Error al actualizar número de WhatsApp de DashboardUser.');
            throw error;
        }
    }
}
export default DashboardUser;
//# sourceMappingURL=DashboardUser.js.map