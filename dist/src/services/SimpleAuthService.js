// src/services/SimpleAuthService.ts - Servicio de autenticación simplificado
import crypto from 'crypto';
import { createModuleLogger } from '../utils/logger.js';
import { DatabaseService } from '../database/DatabaseService.js';
const logger = createModuleLogger('SimpleAuthService');
export class SimpleAuthService {
    static instance;
    databaseService;
    verificationCodes = new Map();
    activeSessions = new Map();
    constructor() {
        this.databaseService = DatabaseService.getInstance();
        // Limpiar códigos de verificación expirados cada 5 minutos
        setInterval(() => {
            this.cleanExpiredData();
        }, 5 * 60 * 1000);
    }
    static getInstance() {
        if (!SimpleAuthService.instance) {
            SimpleAuthService.instance = new SimpleAuthService();
        }
        return SimpleAuthService.instance;
    }
    /**
     * Inicia el proceso de autenticación enviando código de verificación
     */
    async initiateLogin(phoneNumber) {
        try {
            // Normalizar número de teléfono
            const normalizedPhone = this.normalizePhoneNumber(phoneNumber);
            // Verificar si el usuario existe
            let user = await this.databaseService.getUserByPhone(normalizedPhone);
            // Si no existe, crear usuario básico
            if (!user) {
                const userId = await this.databaseService.createUser({
                    phoneNumber: normalizedPhone,
                    role: 'user',
                    status: 'pending',
                    permissions: ['user'],
                    bots: []
                });
                user = await this.databaseService.getUserById(userId);
                if (!user) {
                    throw new Error('Error creando usuario');
                }
                logger.info({ phoneNumber: normalizedPhone }, 'Nuevo usuario creado');
            }
            // Generar código de verificación
            const verificationCode = this.generateVerificationCode();
            const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos
            this.verificationCodes.set(normalizedPhone, {
                code: verificationCode,
                expiresAt,
                attempts: 0
            });
            // En desarrollo, mostrar el código en los logs
            if (process.env.NODE_ENV === 'development') {
                logger.warn({ phoneNumber: normalizedPhone, verificationCode }, '🔐 CÓDIGO DE VERIFICACIÓN (DESARROLLO)');
            }
            return {
                success: true,
                message: 'Código de verificación enviado'
            };
        }
        catch (error) {
            logger.error({ err: error, phoneNumber }, 'Error iniciando login');
            return {
                success: false,
                message: 'Error interno del servidor'
            };
        }
    }
    /**
     * Completa el login con el código de verificación
     */
    async completeLogin(credentials) {
        try {
            const normalizedPhone = this.normalizePhoneNumber(credentials.phoneNumber);
            // Verificar código de verificación
            const storedVerification = this.verificationCodes.get(normalizedPhone);
            if (!storedVerification) {
                logger.warn({ phoneNumber: normalizedPhone }, 'Código de verificación no encontrado');
                return null;
            }
            if (storedVerification.expiresAt < new Date()) {
                this.verificationCodes.delete(normalizedPhone);
                logger.warn({ phoneNumber: normalizedPhone }, 'Código de verificación expirado');
                return null;
            }
            if (storedVerification.attempts >= 3) {
                this.verificationCodes.delete(normalizedPhone);
                logger.warn({ phoneNumber: normalizedPhone }, 'Demasiados intentos de verificación');
                return null;
            }
            if (storedVerification.code !== credentials.verificationCode) {
                storedVerification.attempts++;
                logger.warn({ phoneNumber: normalizedPhone, attempts: storedVerification.attempts }, 'Código de verificación incorrecto');
                return null;
            }
            // Código correcto, eliminar de memoria
            this.verificationCodes.delete(normalizedPhone);
            // Obtener usuario
            const user = await this.databaseService.getUserByPhone(normalizedPhone);
            if (!user) {
                logger.error({ phoneNumber: normalizedPhone }, 'Usuario no encontrado después de verificación');
                return null;
            }
            // Activar usuario si estaba pendiente
            if (user.status === 'pending') {
                user.status = 'active';
            }
            // Actualizar último login
            await this.databaseService.updateUserLastLogin(user.id);
            // Generar token simple
            const authToken = this.generateAuthToken(user);
            logger.info({ userId: user.id, phoneNumber: normalizedPhone }, 'Login exitoso');
            return authToken;
        }
        catch (error) {
            logger.error({ err: error, phoneNumber: credentials.phoneNumber }, 'Error completando login');
            return null;
        }
    }
    /**
     * Genera un token de autenticación simple
     */
    generateAuthToken(user) {
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas
        // Guardar sesión en memoria
        this.activeSessions.set(token, {
            userId: user.id,
            expiresAt
        });
        return {
            token,
            expiresAt,
            user
        };
    }
    /**
     * Valida un token
     */
    async validateToken(token) {
        try {
            const session = this.activeSessions.get(token);
            if (!session) {
                return null;
            }
            if (session.expiresAt < new Date()) {
                this.activeSessions.delete(token);
                return null;
            }
            // Obtener usuario actualizado
            const user = await this.databaseService.getUserById(session.userId);
            if (!user || user.status !== 'active') {
                this.activeSessions.delete(token);
                return null;
            }
            return user;
        }
        catch (error) {
            logger.error({ err: error }, 'Error validando token');
            return null;
        }
    }
    /**
     * Cierra sesión
     */
    async logout(token) {
        this.activeSessions.delete(token);
        logger.info('Sesión cerrada exitosamente');
    }
    /**
     * Verifica si un usuario tiene un permiso específico
     */
    hasPermission(user, requiredPermission) {
        if (user.role === 'owner') {
            return true;
        }
        return user.permissions.includes(requiredPermission);
    }
    /**
     * Verifica si un usuario puede acceder a un bot específico
     */
    async canAccessBot(user, botId) {
        if (user.role === 'owner') {
            return true;
        }
        return user.bots.includes(botId);
    }
    /**
     * Genera un código de verificación de 6 dígitos
     */
    generateVerificationCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    /**
     * Normaliza un número de teléfono
     */
    normalizePhoneNumber(phoneNumber) {
        let normalized = phoneNumber.replace(/[\s\-\(\)]/g, '');
        if (!normalized.startsWith('+')) {
            normalized = '+1' + normalized;
        }
        return normalized;
    }
    /**
     * Limpia datos expirados
     */
    cleanExpiredData() {
        const now = new Date();
        let cleaned = 0;
        // Limpiar códigos de verificación
        for (const [phoneNumber, verification] of this.verificationCodes.entries()) {
            if (verification.expiresAt < now) {
                this.verificationCodes.delete(phoneNumber);
                cleaned++;
            }
        }
        // Limpiar sesiones
        for (const [token, session] of this.activeSessions.entries()) {
            if (session.expiresAt < now) {
                this.activeSessions.delete(token);
                cleaned++;
            }
        }
        if (cleaned > 0) {
            logger.debug({ cleaned }, 'Datos expirados limpiados');
        }
    }
    /**
     * Obtiene estadísticas de autenticación
     */
    getAuthStats() {
        return {
            pendingVerifications: this.verificationCodes.size,
            activeSessions: this.activeSessions.size
        };
    }
    /**
     * Limpia recursos
     */
    async cleanup() {
        this.verificationCodes.clear();
        this.activeSessions.clear();
        logger.info('🧹 SimpleAuthService limpiado');
    }
}
export default SimpleAuthService;
//# sourceMappingURL=SimpleAuthService.js.map