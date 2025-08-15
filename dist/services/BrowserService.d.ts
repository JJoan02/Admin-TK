import { Page } from 'playwright';
declare class BrowserService {
    private browser;
    initialize(): Promise<void>;
    newPage(): Promise<Page>;
    close(): Promise<void>;
    getPageContent(url: string): Promise<string>;
    getScreenshot(url: string): Promise<Buffer>;
}
export default BrowserService;
//# sourceMappingURL=BrowserService.d.ts.map