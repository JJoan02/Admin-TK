import { DatabaseError } from '../core/ErrorHandler.js';
import { UserCreatedEvent, UserUpdatedEvent, UserBannedEvent, UserUnbannedEvent } from '../events/DomainEvents.js';
export class UserManager {
    #config;
    #db;
    #logger;
    #eventStore;
    /**
     * @param {object} config - Objeto de configuración.
     * @param {object} dbService - Instancia del servicio de base de datos.
     * @param {object} logger - Instancia del logger.
     * @param {object} eventStore - Instancia del EventStore.
     */
    constructor(config, dbService, logger, eventStore) {
        this.#config = config;
        this.#db = dbService; // Obtener instancia de DBService
        this.#logger = logger;
        this.#eventStore = eventStore;
        this.users = new Map(); // Almacena datos de usuarios en memoria
    }
    /**
     * Obtiene los datos de un usuario por su JID.
     * @param {string} jid - El JID del usuario.
     * @param {string} pushName - El nombre de usuario para mostrar.
     * @returns {Promise<object>} - Datos del usuario.
     */
    async getUser(jid, pushName) {
        try {
            let userData = await this.#db.get('SELECT * FROM users WHERE jid = ?', jid);
            let isNewUser = false;
            if (!userData) {
                this.#logger.info(`Nuevo usuario detectado: ${jid}. Creando perfil en la base de datos.`);
                userData = {
                    jid,
                    name: pushName,
                    commandCount: 0,
                    isBanned: false,
                    role: 'user', // Valor por defecto
                    warnings: 0,
                    createdAt: new Date().toISOString(),
                    last_activity: new Date().toISOString(),
                    cooldowns: '{}', // Valor por defecto como string JSON
                    isAiEnabled: false,
                };
                await this.#db.run(`INSERT INTO users (jid, name, commandCount, isBanned, role, warnings, createdAt, last_activity, cooldowns,
          isAiEnabled) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, userData.jid, userData.name, userData.commandCount, userData.isBanned, userData.role, userData.warnings, userData.createdAt, userData.last_activity, userData.cooldowns, userData.isAiEnabled);
                isNewUser = true;
            }
            else {
                // Asegurar que el rol tenga un valor por defecto si es nulo o indefinido de la DB
                userData.role = userData.role ?? 'user';
                // Asegurar que el rol sea uno de los roles válidos definidos en config
                if (!Object.values(this.#config.roles).includes(userData.role)) {
                    this.#logger.warn(`Rol de usuario inválido '${userData.role}' para ${jid}. Reseteando a 'user'.`);
                    userData.role = 'user';
                }
                // Parsear cooldowns si es una cadena JSON, o inicializar como objeto vacío
                try {
                    userData.cooldowns = JSON.parse(userData.cooldowns || '{}');
                }
                catch (e) {
                    this.#logger.error({ err: e, jid }, `Error al parsear cooldowns para ${jid}. Reseteando a {}.`);
                    userData.cooldowns = {};
                }
            }
            // SIEMPRE re-evaluar el rol de owner
            const isOwner = this.#config.ownerNumbers.includes(jid.split('@')[0]);
            if (isOwner) {
                userData.role = 'owner';
            }
            else if (userData.role === 'owner' && !isOwner) { // Si era owner pero ya no lo es
                userData.role = 'user'; // Degradarlo a usuario
            }
            // Actualizar pushName si ha cambiado y no es null/undefined
            if (pushName && userData.name !== pushName) {
                userData.name = pushName;
            }
            // Actualizar last_activity
            userData.last_activity = new Date().toISOString();
            // Persistir los cambios en la base de datos
            await this.updateUser(jid, userData);
            // Almacenar/actualizar el usuario en memoria
            this.users.set(jid, userData);
            this.#logger.info(`Usuario agregado/actualizado: ${jid} con rol: ${userData.role}`);
            if (isNewUser) {
                await this.#eventStore.publish(new UserCreatedEvent(jid, userData));
            }
            return userData;
        }
        catch (error) {
            this.#logger.error({ err: error, jid, pushName }, '❌ Error al obtener o crear usuario.');
            throw new DatabaseError('Error al obtener datos del usuario.', error);
        }
    }
    /**
     * Actualiza los datos de un usuario en la base de datos y en memoria.
     * @param {string} jid - El JID del usuario.
     * @param {object} data - Un objeto con los campos a actualizar.
     * @returns {Promise<void>}
     */
    async updateUser(jid, data) {
        try {
            const currentData = this.users.get(jid) || {};
            const oldData = { ...currentData }; // Copia de los datos antiguos
            const newData = { ...currentData, ...data };
            // Asegurarse de que cooldowns sea una cadena JSON para la DB
            if (newData.cooldowns && typeof newData.cooldowns !== 'string') {
                newData.cooldowns = JSON.stringify(newData.cooldowns);
            }
            const fields = Object.keys(newData).filter(key => key !== 'jid').map(key => `${key} = ?`).join(', ');
            const values = Object.values(newData).filter((_, idx) => Object.keys(newData)[idx] !== 'jid');
            await this.#db.run(`UPDATE users SET ${fields} WHERE jid = ?`, ...values, jid);
            this.users.set(jid, newData); // Actualizar también la caché en memoria
            this.#logger.debug(`Usuario ${jid} actualizado en DB y memoria.`);
            // Publicar evento UserUpdatedEvent si hay cambios significativos
            const changedFields = {};
            for (const key in data) {
                if (data.hasOwnProperty(key) && oldData[key] !== data[key]) {
                    changedFields[key] = data[key];
                }
            }
            if (Object.keys(changedFields).length > 0) {
                await this.#eventStore.publish(new UserUpdatedEvent(jid, changedFields));
            }
        }
        catch (error) {
            this.#logger.error({ err: error, jid, data }, '❌ Error al actualizar usuario en DB.');
            throw new DatabaseError('Error al actualizar datos del usuario.', error);
        }
    }
    /**
     * Incrementa el conteo de comandos ejecutados por un usuario.
     * @param {string} jid - El JID del usuario.
     * @returns {Promise<void>}
     */
    async incrementCommandCount(jid) {
        try {
            let userData = this.users.get(jid);
            if (!userData) {
                // Intentar obtener el usuario de la DB si no está en memoria
                userData = await this.getUser(jid);
                if (!userData) {
                    this.#logger.warn(`No se encontró usuario ${jid} para incrementar el conteo de comandos.`);
                    return; // Salir si el usuario no existe
                }
            }
            const oldCommandCount = userData.commandCount || 0;
            userData.commandCount = oldCommandCount + 1; // Incrementar el conteo, asegurando valor inicial
            await this.updateUser(jid, { commandCount: userData.commandCount }); // Persistir el cambio
            this.#logger.info(`Conteo de comandos incrementado para: ${jid}. Total: ${userData.commandCount}`);
        }
        catch (error) {
            this.#logger.error({ err: error, jid }, '❌ Error al incrementar el conteo de comandos.');
            throw new DatabaseError('Error al incrementar el conteo de comandos.', error);
        }
    }
    /**
     * Marca a un usuario como baneado.
     * @param {string} jid - El JID del usuario.
     * @returns {Promise<void>}
     */
    async banUser(jid) {
        try {
            let userData = this.users.get(jid);
            if (!userData) {
                userData = await this.getUser(jid); // Cargar si no está en memoria
                if (!userData) {
                    this.#logger.warn(`No se encontró usuario ${jid} para banear.`);
                    return;
                }
            }
            if (!userData.isBanned) { // Solo banear si no está ya baneado
                userData.isBanned = true; // Marcar como baneado
                await this.updateUser(jid, { isBanned: true }); // Persistir el cambio
                this.#logger.info(`Usuario baneado: ${jid}`);
                await this.#eventStore.publish(new UserBannedEvent(jid, 'Manual ban by command'));
            }
        }
        catch (error) {
            this.#logger.error({ err: error, jid }, '❌ Error al banear usuario.');
            throw new DatabaseError('Error al banear usuario.', error);
        }
    }
    /**
     * Desbaneado a un usuario.
     * @param {string} jid - El JID del usuario.
     * @returns {Promise<void>}
     */
    async unbanUser(jid) {
        try {
            let userData = this.users.get(jid);
            if (!userData) {
                userData = await this.getUser(jid); // Cargar si no está en memoria
                if (!userData) {
                    this.#logger.warn(`No se encontró usuario ${jid} para desbanear.`);
                    return;
                }
            }
            if (userData.isBanned) { // Solo desbanear si está baneado
                userData.isBanned = false; // Marcar como no baneado
                await this.updateUser(jid, { isBanned: false }); // Persistir el cambio
                this.#logger.info(`Usuario desbaneado: ${jid}`);
                await this.#eventStore.publish(new UserUnbannedEvent(jid));
            }
        }
        catch (error) {
            this.#logger.error({ err: error, jid }, '❌ Error al desbanear usuario.');
            throw new DatabaseError('Error al desbanear usuario.', error);
        }
    }
    /**
     * Obtiene el conteo de comandos ejecutados por un usuario.
     * @param {string} jid - El JID del usuario.
     * @returns {Promise<number>} - Conteo de comandos.
     */
    async getCommandCount(jid) {
        try {
            let userData = this.users.get(jid);
            if (!userData) {
                userData = await this.getUser(jid); // Cargar si no está en memoria
                if (!userData) {
                    this.#logger.warn(`No se encontró usuario ${jid} para obtener el conteo de comandos.`);
                    return 0; // Devolver 0 si el usuario no existe
                }
            }
            return userData.commandCount || 0; // Asegurar que siempre devuelva un número
        }
        catch (error) {
            this.#logger.error({ err: error, jid }, '❌ Error al obtener el conteo de comandos.');
            throw new DatabaseError('Error al obtener el conteo de comandos.', error);
        }
    }
    /**
     * Obtiene todos los usuarios de la base de datos.
     * @returns {Promise<Array<object>>}
     */
    async getAllUsers() {
        try {
            const allUsers = await this.#db.all('SELECT * FROM users');
            // Actualizar caché con todos los usuarios
            allUsers.forEach(user => this.users.set(user.jid, user));
            return allUsers;
        }
        catch (error) {
            this.#logger.error({ err: error }, 'Error al obtener todos los usuarios');
            throw new DatabaseError('Error al obtener todos los usuarios.', error);
        }
    }
}
export default UserManager;
//# sourceMappingURL=UserManager.js.map