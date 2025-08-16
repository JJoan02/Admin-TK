import { BasePlugin } from '../base/BasePlugin.js';
export declare class CollectMarketPlugin extends BasePlugin {
    private collectionManager;
    constructor();
    execute(context: any): Promise<void>;
    private scrapePinterestImage;
    private downloadAndSaveImage;
    private calculateMarketValue;
    private getUserCoins;
    private addUserCoins;
    private removeUserCoins;
    private getRarityEmoji;
}
declare const handler: {
    (m: any, { conn, args, usedPrefix, command }: any): Promise<void>;
    command: string[];
};
export default handler;
//# sourceMappingURL=collect-market.d.ts.map