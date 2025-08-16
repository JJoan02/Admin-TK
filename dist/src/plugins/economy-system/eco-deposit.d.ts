import { BasePlugin } from '../base/BasePlugin.js';
export declare class ecodepositPlugin extends BasePlugin {
    constructor();
    execute(context: any): Promise<void>;
    const handler: (m: any, { conn, text, usedPrefix, command }: any) => Promise<void>;
    handler: (m: any, { conn, text, usedPrefix, command }: any) => Promise<void>;
    command: string[][];
    export: any;
    default: any;
    handler: (m: any, { conn, text, usedPrefix, command }: any) => Promise<void>;
}
//# sourceMappingURL=eco-deposit.d.ts.map