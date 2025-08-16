import type { DashboardUser, Permission } from '../types/index.js';
export interface LoginCredentials {
    phoneNumber: string;
    verificationCode?: string;
}
export interface AuthToken {
    token: string;
    expiresAt: Date;
    user: DashboardUser;
}
export declare class SimpleAuthService {
    private static instance;
    private databaseService;
    private verificationCodes;
    private activeSessions;
    private constructor();
    static getInstance(): SimpleAuthService;
    /**
     * Inicia el proceso de autenticación enviando código de verificación
     */
    initiateLogin(phoneNumber: string): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * Completa el login con el código de verificación
     */
    completeLogin(credentials: LoginCredentials): Promise<AuthToken | null>;
    /**
     * Genera un token de autenticación simple
     */
    private generateAuthToken;
    /**
     * Valida un token
     */
    validateToken(token: string): Promise<DashboardUser | null>;
    /**
     * Cierra sesión
     */
    logout(token: string): Promise<void>;
    /**
     * Verifica si un usuario tiene un permiso específico
     */
    hasPermission(user: DashboardUser, requiredPermission: Permission): boolean;
    /**
     * Verifica si un usuario puede acceder a un bot específico
     */
    canAccessBot(user: DashboardUser, botId: string): Promise<boolean>;
    /**
     * Genera un código de verificación de 6 dígitos
     */
    private generateVerificationCode;
    /**
     * Normaliza un número de teléfono
     */
    private normalizePhoneNumber;
    /**
     * Limpia datos expirados
     */
    private cleanExpiredData;
    /**
     * Obtiene estadísticas de autenticación
     */
    getAuthStats(): {
        pendingVerifications: number;
        activeSessions: number;
    };
    /**
     * Limpia recursos
     */
    cleanup(): Promise<void>;
}
export default SimpleAuthService;
//# sourceMappingURL=SimpleAuthService.d.ts.map