export declare const roleHierarchy: {
    user: number;
    group_admin: number;
    owner: number;
};
export declare class Auth {
    static hasMinRole(userRole: any, requiredRole: any): boolean;
    static isOwner(userRole: any): boolean;
}
export default Auth;
//# sourceMappingURL=auth.d.ts.map