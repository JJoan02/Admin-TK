export declare class ConnectionManager {
    #private;
    sock: null;
    constructor(sessionManager: any, eventHandler: any, logger: any, config: any);
    connect(options?: {}): Promise<unknown>;
    disconnect(): Promise<void>;
    generateQrCode(): Promise<null>;
}
export default ConnectionManager;
//# sourceMappingURL=ConnectionManager.d.ts.map