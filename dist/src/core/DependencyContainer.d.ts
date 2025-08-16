export declare class DependencyContainer {
    #private;
    constructor();
    static getInstance(): any;
    register(name: any, resolver: any, { dependencies, isSingleton }?: {
        dependencies?: never[] | undefined;
        isSingleton?: boolean | undefined;
    }): void;
    resolve(name: any): any;
    isRegistered(name: any): boolean;
    clear(): void;
}
export default DependencyContainer;
//# sourceMappingURL=DependencyContainer.d.ts.map