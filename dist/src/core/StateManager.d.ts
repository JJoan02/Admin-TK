export declare const BotState: {
    INITIALIZING: string;
    CONNECTING: string;
    READY: string;
    RECONNECTING: string;
    SHUTTING_DOWN: string;
    DISCONNECTED: string;
};
export declare class StateManager {
    #private;
    constructor();
    static getInstance(): any;
    setState(newState: any): void;
    getState(): string;
    is(state: any): boolean;
}
declare const _default: any;
export default _default;
//# sourceMappingURL=StateManager.d.ts.map