import { BasePlugin } from '../base/BasePlugin.js';
export declare class RpgProfilePlugin extends BasePlugin {
    constructor();
    execute(context: any): Promise<void>;
    private getUserRPGProfile;
    private updateUserRPG;
}
declare const handler: {
    (m: any, { conn, args, usedPrefix, command }: any): Promise<void>;
    command: string[];
};
export default handler;
//# sourceMappingURL=rpg-profile.d.ts.map