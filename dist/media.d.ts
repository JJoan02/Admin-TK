export declare const checkFFmpegInstallation: () => Promise<unknown>;
export declare const toAudio: (input: any, inputExt: any) => Promise<{
    data: any;
    filename: string;
} | null>;
export declare const toMp3: (input: any, inputExt: any) => Promise<any>;
export declare const toMp4: (input: any, inputExt: any) => Promise<any>;
export declare const toWebm: (input: any, inputExt: any) => Promise<any>;
export declare const webpToMp4: (input: any) => Promise<any>;
export declare const toWebp: (input: any, inputExt: any, animated?: boolean) => Promise<any>;
export declare const toGif: (input: any, inputExt: any) => Promise<any>;
export declare const convertVideo: (input: any, inputExt: any, format: any) => Promise<any>;
export declare const optimizeImage: (input: any, inputExt: any, options?: {}) => Promise<any>;
export declare const extractAudio: (input: any, inputExt: any, format?: string) => Promise<any>;
export declare const changeSpeed: (input: any, inputExt: any, speed?: number) => Promise<any>;
export declare const trimMedia: (input: any, inputExt: any, start: any, duration: any) => Promise<any>;
export declare const combineMedia: (inputs: any, outputFormat: any) => Promise<Buffer<ArrayBufferLike> | null>;
export declare const toWebpSticker: (mediaBuffer: any, animated?: boolean) => Promise<any>;
export declare const extractFrame: (videoBuffer: any, timestamp?: number) => Promise<any>;
export declare const compressVideo: (videoBuffer: any, quality?: number) => Promise<any>;
//# sourceMappingURL=media.d.ts.map