export declare class MonitoringService {
    constructor(webServer: any, logger: any);
    startMonitoring(intervalMs?: number): void;
    stopMonitoring(): void;
    collectAndSendMetrics(): void;
    simulateRecentInteraction(): void;
}
export default MonitoringService;
//# sourceMappingURL=MonitoringService.d.ts.map