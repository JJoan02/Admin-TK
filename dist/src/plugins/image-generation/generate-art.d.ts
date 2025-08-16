import { BasePlugin } from '../base/BasePlugin.js';
export declare class GenerateArtPlugin extends BasePlugin {
    constructor();
    execute(context: any): Promise<void>;
    private generateImage;
}
declare const handler: {
    (m: any, { conn, args, usedPrefix, command }: any): Promise<void>;
    command: string[];
};
export default handler;
//# sourceMappingURL=generate-art.d.ts.map