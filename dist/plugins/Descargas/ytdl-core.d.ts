export = YT;
declare class YT {
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
        title: any;
        thumb: any;
        date: any;
        duration: any;
        channel: any;
        quality: any;
        contentLength: any;
        description: any;
        videoUrl: any;
    }>;
    static mp3: (url: string | URL, metadata?: {
        Title: string;
        Artist: string;
        Image: string;
        Album: string;
        Year: string;
    }, autoWriteTags?: boolean) => Promise<{
        meta: {
            title: any;
            channel: any;
            seconds: any;
            description: any;
            image: any;
        };
        path: any;
        size: number;
    }>;
}
//# sourceMappingURL=ytdl-core.d.ts.map