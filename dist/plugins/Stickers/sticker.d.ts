export function sticker(isImage: any, url: string, packname: string, author: string): Promise<any>;
export function sticker2(img: Buffer, url: string): Promise<any>;
export function sticker3(img: Buffer, url: string, packname: string, author: string): Promise<any>;
export function sticker4(img: Buffer, url: string): Promise<any>;
export function sticker6(img: string, url: string): Promise<any>;
export function addExif(webpSticker: Buffer, packname: string, author: string, categories?: string, extra?: Object): Promise<any>;
export namespace support {
    let ffmpeg: boolean;
    let ffprobe: boolean;
    let ffmpegWebp: boolean;
    let convert: boolean;
    let magick: boolean;
    let gm: boolean;
    let find: boolean;
}
//# sourceMappingURL=sticker.d.ts.map