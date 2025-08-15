import { chromium } from 'playwright';
class BrowserService {
    browser = null;
    async initialize() {
        if (!this.browser) {
            this.browser = await chromium.launch();
            console.log('BrowserService: Headless browser launched.');
        }
    }
    async newPage() {
        if (!this.browser) {
            throw new Error('Browser not initialized. Call initialize() first.');
        }
        return this.browser.newPage();
    }
    async close() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
            console.log('BrowserService: Headless browser closed.');
        }
    }
    async getPageContent(url) {
        const page = await this.newPage();
        try {
            await page.goto(url);
            return await page.content();
        }
        finally {
            await page.close();
        }
    }
    async getScreenshot(url) {
        const page = await this.newPage();
        try {
            await page.goto(url);
            return await page.screenshot();
        }
        finally {
            await page.close();
        }
    }
}
export default BrowserService;
//# sourceMappingURL=BrowserService.js.map