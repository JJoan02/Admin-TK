import type { DashboardUser, Permission, UserRole } from '../types/index.js';
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
export declare class AuthService {
    private static instance;
    private databaseService;
    private jwtSecret;
    private refreshSecret;
    private verificationCodes;
    private constructor();
    static getInstance(): AuthService;
    /**
     * Genera un secreto aleatorio
     */
    private generateSecret;
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
     * Genera tokens de autenticación
     */
    private generateAuthToken;
    /**
     * Valida un token JWT
     */
    validateToken(token: string): Promise<DashboardUser | null>;
    /**
     * Refresca un token usando el refresh token
     */
    refreshToken(refreshToken: string): Promise<AuthToken | null>;
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
     * Limpia códigos de verificación expirados
     */
    private cleanExpiredVerificationCodes;
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
export default AuthService;
//# sourceMappingURL=AuthService.d.ts.map