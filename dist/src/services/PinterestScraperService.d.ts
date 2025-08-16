export declare class PinterestScraperService {
    private static instance;
    static getInstance(): PinterestScraperService;
    searchImages(keywords: string[], limit?: number): Promise<any[]>;
    downloadImage(imageUrl: string, filename: string, directory: string): Promise<string | null>;
}
//# sourceMappingURL=PinterestScraperService.d.ts.map