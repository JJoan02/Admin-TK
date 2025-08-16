export declare class DashboardUser {
    #private;
    constructor(dbService: any);
    create(username: any, hashedPassword: any, whatsappNumber?: null, role?: string): Promise<any>;
    findByUsername(username: any): Promise<any>;
    findById(id: any): Promise<any>;
    updatePassword(userId: any, hashedPassword: any): Promise<void>;
    updateWhatsappNumber(userId: any, whatsappNumber: any): Promise<void>;
}
export default DashboardUser;
//# sourceMappingURL=DashboardUser.d.ts.map