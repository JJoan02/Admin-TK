declare const _exports: YTDownloader;
export = _exports;
declare class YTDownloader {
    static isYTUrl: (url: string | URL) => boolean;
    static getVideoID: (url: string | URL) => string | undefined;
    static WriteTags: (filePath: string, Metadata: {
        Title: string;
        Artist: string;
        Image: string;
        Album: string;
        Year: string;
    }) => Promise<void>;
    static search: (query: string, options?: {}) => Promise<any>;
    static searchTrack: (query: string) => Promise<{
        isYtMusic: boolean;
        title: string;
        artist: string;
        id: string;
        url: string;
        album: string;
        duration: Object;
        image: string;
    }[]>;
    static downloadMusic: (query: string | {
        isYtMusic: boolean;
        title: string;
        artist: string;
        id: string;
        url: string;
        album: string;
        duration: Object;
        image: string;
    }[]) => Promise<{
        meta: {
            isYtMusic: boolean;
            title: string;
            artist: string;
            id: string;
            url: string;
            album: string;
            duration: Object;
            image: string;
        };
        path: string;
    }>;
    static mp4: (query: string | URL, quality?: string) => Promise<{
        title: string;
        thumb: ytdl.thumbnail | undefined;
        date: string;
        duration: string;
        channel: string;
        quality: "360p" | "720p" | "144p" | "144p 15fps" | "144p60 HDR" | "240p" | "240p60 HDR" | "270p" | "360p60 HDR" | "480p" | "480p60 HDR" | "720p60" | "720p60 HDR" | "1080p" | "1080p60" | "1080p60 HDR" | "1440p" | "1440p60" | "1440p60 HDR" | "2160p" | "2160p60" | "2160p60 HDR" | "4320p" | "4320p60";
        contentLength: string;
        description: string | null;
        videoUrl: string;
    }>;
    static mp3: (url: string | URL, metadata?: {
        Title: string;
        Artist: string;
        Image: string;
        Album: string;
        Year: string;
    }, autoWriteTags?: boolean) => Promise<{
        meta: {
            title: string;
            channel: string;
            seconds: string;
            image: string;
        };
        path: any;
        size: number;
    }>;
    tmpDir: string;
    mp3(url: any): Promise<any>;
}
import ytdl = require("@distube/ytdl-core");
//# sourceMappingURL=ytdl2.d.ts.map