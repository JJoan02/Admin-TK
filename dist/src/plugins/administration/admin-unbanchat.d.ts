import { BasePlugin } from '../base/BasePlugin.js';
export declare class adminunbanchatPlugin extends BasePlugin {
    constructor();
    execute(context: any): Promise<void>;
}
declare const handler: {
    (m: any, { conn, text, usedPrefix, command }: any): Promise<void>;
    command: string[][];
    rowner: boolean;
};
export default handler;
//# sourceMappingURL=admin-unbanchat.d.ts.map