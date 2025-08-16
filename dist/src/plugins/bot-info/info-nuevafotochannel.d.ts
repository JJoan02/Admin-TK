import { BasePlugin } from '../base/BasePlugin.js';
export declare class infonuevafotochannelPlugin extends BasePlugin {
    constructor();
    execute(context: any): Promise<void>;
}
declare const handler: {
    (m: any, { conn, text, usedPrefix, command }: any): Promise<void>;
    command: string[][];
};
export default handler;
//# sourceMappingURL=info-nuevafotochannel.d.ts.map