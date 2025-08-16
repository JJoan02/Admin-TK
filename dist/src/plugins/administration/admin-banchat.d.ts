import { BasePlugin } from '../base/BasePlugin.js';
export declare class adminbanchatPlugin extends BasePlugin {
    constructor();
    execute(context: any): Promise<void>;
}
declare const handler: {
    (m: any, { conn, text, usedPrefix, command }: any): Promise<void>;
    command: string[];
    rowner: boolean;
};
export default handler;
//# sourceMappingURL=admin-banchat.d.ts.map