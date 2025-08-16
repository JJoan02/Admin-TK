import { BasePlugin } from '../base/BasePlugin.js';
export declare class adminconsejoPlugin extends BasePlugin {
    constructor();
    execute(context: any): Promise<void>;
}
declare const handler: {
    (m: any, { conn, text, usedPrefix, command }: any): Promise<void>;
    command: string[][];
};
export default handler;
//# sourceMappingURL=admin-consejo.d.ts.map