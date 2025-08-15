import User from '../../models/User.js'; // Ruta corregida
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import NotificationService from './NotificationService.js';

class AuthService {
    constructor(dbService, logger) {
        this.dbService = dbService;
        this.logger = logger;
    }

    async authenticateUser(username, password) {
        try {
            const user = await User.findByUsername(username);
            if (!user) {
                return { success: false, message: 'Usuario no encontrado.' };
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return { success: false, message: 'Contraseña incorrecta.' };
            }

            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { success: true, message: 'Autenticación exitosa.', token, user: { id: user.id, username: user.username, role: user.role } };
        } catch (error) {
            this.logger.error(`Error durante la autenticación: ${error.message}`);
            return { success: false, message: 'Error interno del servidor.' };
        }
    }

    async registerUser(username, password, whatsappNumber) {
        try {
            const existingUser = await User.findByUsername(username);
            if (existingUser) {
                return { success: false, message: 'El nombre de usuario ya existe.' };
            }

            const userId = await User.create({ username, password, whatsappNumber });
            return { success: true, message: 'Usuario registrado con éxito.', userId };
        } catch (error) {
            this.logger.error(`Error durante el registro de usuario: ${error.message}`);
            return { success: false, message: 'Error interno del servidor.' };
        }
    }

    async generateAndSendResetCode(username, whatsappNumber, notificationService) {
        try {
            const user = await User.findByUsername(username);
            if (!user) {
                return { success: false, message: 'Usuario no encontrado.' };
            }

            // Generar un código de 6 dígitos
            const code = speakeasy.totp({ secret: speakeasy.generateSecret().base32, encoding: 'base32' });
            await User.saveResetCode(user.id, code);

            // Enviar el código por WhatsApp (asumiendo que whatsappNumber está en el usuario o se pasa)
            // Aquí se asume que el whatsappNumber es el del usuario, o se obtiene de alguna manera.
            // Por simplicidad, se usa el whatsappNumber pasado, pero en un caso real, se validaría.
            if (whatsappNumber) {
                notificationService.sendNotification(`Tu código de restablecimiento de Admin-TK es: ${code}`, whatsappNumber);
            } else {
                this.logger.warn(`No se pudo enviar el código de restablecimiento a ${username}: número de WhatsApp no proporcionado.`);
            }
            
            return { success: true, message: 'Código de restablecimiento enviado.' };
        } catch (error) {
            this.logger.error(`Error al generar y enviar código de restablecimiento: ${error.message}`);
            return { success: false, message: 'Error interno del servidor.' };
        }
    }

    async validateResetCode(username, code) {
        try {
            const user = await User.findByUsername(username);
            if (!user) {
                return { success: false, message: 'Usuario no encontrado.' };
            }

            // En un sistema real, se usaría speakeasy.totp.verify o se compararía un código de un solo uso.
            // Para este ejemplo, se compara directamente con el two_factor_secret almacenado.
            if (user.two_factor_secret === code) {
                return { success: true, message: 'Código validado con éxito.' };
            } else {
                return { success: false, message: 'Código inválido.' };
            }
        } catch (error) {
            this.logger.error(`Error al validar código de restablecimiento: ${error.message}`);
            return { success: false, message: 'Error interno del servidor.' };
        }
    }

    async updatePassword(username, newPassword) {
        try {
            const user = await User.findByUsername(username);
            if (!user) {
                return { success: false, message: 'Usuario no encontrado.' };
            }

            await User.updatePassword(username, newPassword);
            return { success: true, message: 'Contraseña actualizada con éxito.' };
        } catch (error) {
            this.logger.error(`Error al actualizar contraseña: ${error.message}`);
            return { success: false, message: 'Error interno del servidor.' };
        }
    }
}

export default AuthService;