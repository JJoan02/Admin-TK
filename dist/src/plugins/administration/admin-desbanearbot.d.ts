import { BasePlugin } from '../base/BasePlugin.js';
export declare class admindesbanearbotPlugin extends BasePlugin {
    constructor();
    execute(context: any): Promise<void>;
}
declare const handler: {
    (m: any, { conn, text, usedPrefix, command }: any): Promise<void>;
    command: string[][];
    group: boolean;
};
export default handler;
//# sourceMappingURL=admin-desbanearbot.d.ts.map