import { BasePlugin } from '../base/BasePlugin.js';
export declare class ainuevolinkPlugin extends BasePlugin {
    constructor();
    execute(context: any): Promise<void>;
}
declare const handler: {
    (m: any, { conn, text, usedPrefix, command }: any): Promise<void>;
    command: string[][];
    admin: boolean;
};
export default handler;
//# sourceMappingURL=ai-nuevolink.d.ts.map