declare const Metrics: {
    register: any;
    messagesReceivedCounter: any;
    commandExecutionsCounter: any;
    aiResponseTimeHistogram: any;
    dbQueryTimeHistogram: any;
    errorsTotalCounter: any;
    activeConnectionsGauge: any;
    jobQueueQueuedTotal: any;
    jobQueueProcessingTotal: any;
    jobQueueCompletedTotal: any;
    jobQueueFailedTotal: any;
    jobQueueRetriedTotal: any;
    jobQueueTimedOutTotal: any;
    jobQueueJobDurationMs: any;
    increment: (metricName: any, labels?: {}) => void;
    gauge: (metricName: any, value: any, labels?: {}) => void;
    startLogging: () => void;
};
export default Metrics;
//# sourceMappingURL=Metrics.d.ts.map