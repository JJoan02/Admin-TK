import { BasePlugin } from '../base/BasePlugin.js';
export declare class CollectPokemonPlugin extends BasePlugin {
    constructor();
    execute(context: any): Promise<void>;
    private getUserCollection;
    private addToCollection;
    private getRarityEmoji;
}
declare const handler: {
    (m: any, { conn, args, usedPrefix, command }: any): Promise<void>;
    command: string[];
};
export default handler;
//# sourceMappingURL=collect-pokemon.d.ts.map