// src/services/AuthService.ts - Servicio de autenticación

import crypto from 'crypto';
import { createModuleLogger } from '../utils/logger.js';
import { DatabaseService } from '../database/DatabaseService.js';
import type { DashboardUser, Permission, UserRole } from '../types/index.js';

const logger = createModuleLogger('AuthService');

export interface LoginCredentials {
  phoneNumber: string;
  password?: string;
  verificationCode?: string;
}

export interface AuthToken {
  token: string;
  refreshToken: string;
  expiresAt: Date;
  user: DashboardUser;
}

export interface JWTPayload {
  userId: string;
  phoneNumber: string;
  role: UserRole;
  permissions: Permission[];
  iat: number;
  exp: number;
}

export class AuthService {
  private static instance: AuthService;
  private databaseService: DatabaseService;
  private jwtSecret: string;
  private refreshSecret: string;
  private verificationCodes: Map<string, { code: string; expiresAt: Date; attempts: number }> = new Map();

  private constructor() {
    this.databaseService = DatabaseService.getInstance();
    this.jwtSecret = process.env.JWT_SECRET || this.generateSecret();
    this.refreshSecret = process.env.REFRESH_SECRET || this.generateSecret();
    
    // Limpiar códigos de verificación expirados cada 5 minutos
    setInterval(() => {
      this.cleanExpiredVerificationCodes();
    }, 5 * 60 * 1000);
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Genera un secreto aleatorio
   */
  private generateSecret(): string {
    return crypto.randomBytes(64).toString('hex');
  }

  /**
   * Inicia el proceso de autenticación enviando código de verificación
   */
  async initiateLogin(phoneNumber: string): Promise<{ success: boolean; message: string }> {
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

      // TODO: Enviar código por WhatsApp o SMS
      logger.info({ phoneNumber: normalizedPhone, code: verificationCode }, 'Código de verificación generado');

      // En desarrollo, mostrar el código en los logs
      if (process.env.NODE_ENV === 'development') {
        logger.warn({ phoneNumber: normalizedPhone, verificationCode }, '🔐 CÓDIGO DE VERIFICACIÓN (DESARROLLO)');
      }

      return {
        success: true,
        message: 'Código de verificación enviado'
      };

    } catch (error) {
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
  async completeLogin(credentials: LoginCredentials): Promise<AuthToken | null> {
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
        // TODO: Actualizar estado del usuario en base de datos
        user.status = 'active';
      }

      // Actualizar último login
      await this.databaseService.updateUserLastLogin(user.id);

      // Generar tokens
      const authToken = await this.generateAuthToken(user);
      
      logger.info({ userId: user.id, phoneNumber: normalizedPhone }, 'Login exitoso');
      
      return authToken;

    } catch (error) {
      logger.error({ err: error, phoneNumber: credentials.phoneNumber }, 'Error completando login');
      return null;
    }
  }

  /**
   * Genera tokens de autenticación
   */
  private async generateAuthToken(user: DashboardUser): Promise<AuthToken> {
    const payload: Omit<JWTPayload, 'iat' | 'exp'> = {
      userId: user.id,
      phoneNumber: user.phoneNumber,
      role: user.role,
      permissions: user.permissions
    };

    // Token principal (1 hora)
    const token = jwt.sign(payload, this.jwtSecret, {
      expiresIn: '1h',
      issuer: 'admin-tk',
      audience: 'dashboard'
    });

    // Refresh token (7 días)
    const refreshToken = jwt.sign(
      { userId: user.id, type: 'refresh' },
      this.refreshSecret,
      {
        expiresIn: '7d',
        issuer: 'admin-tk',
        audience: 'dashboard'
      }
    );

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    // Guardar sesión en base de datos
    await this.databaseService.createSession(user.id, token, expiresAt);

    return {
      token,
      refreshToken,
      expiresAt,
      user
    };
  }

  /**
   * Valida un token JWT
   */
  async validateToken(token: string): Promise<DashboardUser | null> {
    try {
      // Verificar token JWT
      const decoded = jwt.verify(token, this.jwtSecret, {
        issuer: 'admin-tk',
        audience: 'dashboard'
      }) as JWTPayload;

      // Verificar sesión en base de datos
      const userId = await this.databaseService.validateSession(token);
      if (!userId || userId !== decoded.userId) {
        logger.warn({ tokenUserId: decoded.userId, sessionUserId: userId }, 'Token válido pero sesión inválida');
        return null;
      }

      // Obtener usuario actualizado
      const user = await this.databaseService.getUserById(decoded.userId);
      if (!user || user.status !== 'active') {
        logger.warn({ userId: decoded.userId, userStatus: user?.status }, 'Usuario no activo');
        return null;
      }

      return user;

    } catch (error) {
      if (error instanceof Error) {
        logger.debug({ err: error.message }, 'Token JWT inválido');
      } else {
        logger.error({ err: error }, 'Error validando token');
      }
      return null;
    }
  }

  /**
   * Refresca un token usando el refresh token
   */
  async refreshToken(refreshToken: string): Promise<AuthToken | null> {
    try {
      // Verificar refresh token
      const decoded = jwt.verify(refreshToken, this.refreshSecret, {
        issuer: 'admin-tk',
        audience: 'dashboard'
      }) as any;

      if (decoded.type !== 'refresh') {
        logger.warn('Token de refresh inválido');
        return null;
      }

      // Obtener usuario
      const user = await this.databaseService.getUserById(decoded.userId);
      if (!user || user.status !== 'active') {
        logger.warn({ userId: decoded.userId }, 'Usuario no encontrado o inactivo para refresh');
        return null;
      }

      // Generar nuevo token
      const newAuthToken = await this.generateAuthToken(user);
      
      logger.info({ userId: user.id }, 'Token refrescado exitosamente');
      
      return newAuthToken;

    } catch (error) {
      logger.error({ err: error }, 'Error refrescando token');
      return null;
    }
  }

  /**
   * Cierra sesión
   */
  async logout(token: string): Promise<void> {
    try {
      // Eliminar sesión de base de datos
      await this.databaseService.deleteSession(token);
      
      logger.info('Sesión cerrada exitosamente');

    } catch (error) {
      logger.error({ err: error }, 'Error cerrando sesión');
    }
  }

  /**
   * Verifica si un usuario tiene un permiso específico
   */
  hasPermission(user: DashboardUser, requiredPermission: Permission): boolean {
    // El owner tiene todos los permisos
    if (user.role === 'owner') {
      return true;
    }

    // Verificar permisos específicos
    return user.permissions.includes(requiredPermission);
  }

  /**
   * Verifica si un usuario puede acceder a un bot específico
   */
  async canAccessBot(user: DashboardUser, botId: string): Promise<boolean> {
    // El owner puede acceder a todos los bots
    if (user.role === 'owner') {
      return true;
    }

    // Verificar si el bot pertenece al usuario
    return user.bots.includes(botId);
  }

  /**
   * Genera un código de verificación de 6 dígitos
   */
  private generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Normaliza un número de teléfono
   */
  private normalizePhoneNumber(phoneNumber: string): string {
    // Remover espacios, guiones y paréntesis
    let normalized = phoneNumber.replace(/[\s\-\(\)]/g, '');
    
    // Si no empieza con +, agregar código de país por defecto
    if (!normalized.startsWith('+')) {
      // Asumir código de país +1 si no se especifica
      normalized = '+1' + normalized;
    }
    
    return normalized;
  }

  /**
   * Limpia códigos de verificación expirados
   */
  private cleanExpiredVerificationCodes(): void {
    const now = new Date();
    let cleaned = 0;

    for (const [phoneNumber, verification] of this.verificationCodes.entries()) {
      if (verification.expiresAt < now) {
        this.verificationCodes.delete(phoneNumber);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      logger.debug({ cleaned }, 'Códigos de verificación expirados limpiados');
    }
  }

  /**
   * Obtiene estadísticas de autenticación
   */
  getAuthStats(): {
    pendingVerifications: number;
    activeSessions: number;
  } {
    return {
      pendingVerifications: this.verificationCodes.size,
      activeSessions: 0 // TODO: Obtener de base de datos
    };
  }

  /**
   * Limpia recursos
   */
  async cleanup(): Promise<void> {
    this.verificationCodes.clear();
    await this.databaseService.cleanExpiredSessions();
    logger.info('🧹 AuthService limpiado');
  }
}

export default AuthService;
