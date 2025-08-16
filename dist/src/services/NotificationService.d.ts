export declare class NotificationService {
    constructor(config: any, logger: any, whatsappClient: any);
    sendNotification(message: any, recipient: any): void;
    static notifyOwner(title: any, error: any, details?: string): Promise<void>;
}
export default NotificationService;
//# sourceMappingURL=NotificationService.d.ts.map