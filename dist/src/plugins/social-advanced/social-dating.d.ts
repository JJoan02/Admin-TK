import { BasePlugin } from '../base/BasePlugin.js';
export declare class SocialDatingPlugin extends BasePlugin {
    constructor();
    execute(context: any): Promise<void>;
    private getUserRPGProfile;
    private updateUserRPG;
    private addToCollection;
    private getRarityEmoji;
    private getItemEmoji;
}
declare const handler: {
    (m: any, { conn, args, usedPrefix, command }: any): Promise<void>;
    command: string[];
};
export default handler;
//# sourceMappingURL=social-dating.d.ts.map