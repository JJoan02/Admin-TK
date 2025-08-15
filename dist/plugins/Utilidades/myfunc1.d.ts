export function generateMessageTag(epoch: any): string;
export function processTime(timestamp: any, now: any): number;
export function getRandom(ext: any): string;
export function getBuffer(url: any, options: any): Promise<any>;
export function fetchJson(url: any, options: any): Promise<any>;
export function runtime(seconds: any): string;
export function clockString(ms: any): string;
export function sleep(ms: any): Promise<any>;
export function isUrl(url: any): any;
export function getTime(format: any, date: any): string;
export function formatDate(n: any, locale?: string): string;
export function tanggal(numer: any): string;
export const formatp: (size: number) => string;
export function jsonformat(string: any): string;
export function logic(check: any, inp: any, out: any): any;
export function generateProfilePicture(buffer: any): Promise<{
    img: Buffer<ArrayBufferLike>;
    preview: Buffer<ArrayBufferLike>;
}>;
export function bytesToSize(bytes: any, decimals?: number): string;
export function getSizeMedia(path: any): Promise<any>;
export function parseMention(text?: string): string[];
export function GIFBufferToVideoBuffer(image: any): Promise<NonSharedBuffer>;
export function smsg(conn: WAConnection, m: Object, store: any): Object;
export function unixTimestampSeconds(date?: Date): number;
//# sourceMappingURL=myfunc1.d.ts.map