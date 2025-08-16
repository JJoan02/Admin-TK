import { BasePlugin } from '../base/BasePlugin.js';
export declare class dlhappymodsearchPlugin extends BasePlugin {
    constructor();
    execute(context: any): Promise<void>;
}
declare const handler: {
    (m: any, { conn, text, usedPrefix, command }: any): Promise<void>;
    command: string[][];
};
export default handler;
//# sourceMappingURL=dl-happymodsearch.d.ts.map