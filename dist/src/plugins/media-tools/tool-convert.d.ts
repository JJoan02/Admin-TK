export declare class Image {
    constructor();
    clear(): void;
    get width(): any;
    get height(): any;
    get type(): any;
    get hasAnim(): any;
    get anim(): any;
    get frameCount(): any;
    get iccp(): any;
    set iccp(raw: any);
    get exif(): any;
    set exif(raw: any);
    get xmp(): any;
    set xmp(raw: any);
    load(path: any): Promise<unknown>;
    demuxAnim(path: any, frame?: number, prefix?: string): Promise<unknown>;
    replaceFrame(path: any, frame: any): Promise<unknown>;
    muxAnim({ path, bgColor, loops }?: {
        bgColor?: number[] | undefined;
        loops?: number | undefined;
    }): Promise<unknown>;
    static muxAnim({ path, frames, width, height, bgColor, loops, delay, x, y, blend, dispose, }?: {
        width?: number | undefined;
        height?: number | undefined;
        bgColor?: number[] | undefined;
        loops?: number | undefined;
        delay?: number | undefined;
        x?: number | undefined;
        y?: number | undefined;
        blend?: boolean | undefined;
        dispose?: boolean | undefined;
    }): Promise<unknown>;
}
declare const _default_1: {};
export default _default_1;
//# sourceMappingURL=tool-convert.d.ts.map