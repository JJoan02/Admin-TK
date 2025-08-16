export declare class CollectionManagerService {
    private static instance;
    private scraper;
    static getInstance(): CollectionManagerService;
    constructor();
    scrapePinterestImage(keywords: string[]): Promise<any | null>;
    downloadAndSaveImage(imageUrl: string, type: string, userJid: string): Promise<any>;
    calculateMarketValue(rarity: string): number;
    getUserCoins(userJid: string): Promise<number>;
    addUserCoins(userJid: string, amount: number): Promise<void>;
    removeUserCoins(userJid: string, amount: number): Promise<void>;
}
//# sourceMappingURL=CollectionManagerService.d.ts.map