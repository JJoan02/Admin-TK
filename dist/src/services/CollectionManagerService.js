// src/services/CollectionManagerService.ts - Gestor de colecciones
import { DatabaseService } from '../database/DatabaseService.js';
import { PinterestScraperService } from './PinterestScraperService.js';
import path from 'path';
export class CollectionManagerService {
    static instance;
    scraper;
    static getInstance() {
        if (!this.instance) {
            this.instance = new CollectionManagerService();
        }
        return this.instance;
    }
    constructor() {
        this.scraper = PinterestScraperService.getInstance();
    }
    async scrapePinterestImage(keywords) {
        const images = await this.scraper.searchImages(keywords, 10);
        if (images.length === 0)
            return null;
        // Seleccionar imagen aleatoria
        return images[Math.floor(Math.random() * images.length)];
    }
    async downloadAndSaveImage(imageUrl, type, userJid) {
        const timestamp = Date.now();
        const filename = `${type}_${timestamp}_${Math.random().toString(36).substr(2, 9)}.jpg`;
        const userDir = path.join('./storage/collections', userJid.split('@')[0]);
        const filePath = await this.scraper.downloadImage(imageUrl, filename, userDir);
        return {
            path: filePath,
            filename: filename,
            directory: userDir
        };
    }
    calculateMarketValue(rarity) {
        const values = {
            'common': Math.floor(Math.random() * 50) + 10,
            'uncommon': Math.floor(Math.random() * 100) + 50,
            'rare': Math.floor(Math.random() * 200) + 100,
            'epic': Math.floor(Math.random() * 500) + 200,
            'legendary': Math.floor(Math.random() * 1000) + 500,
            'mythical': Math.floor(Math.random() * 2000) + 1000
        };
        return values[rarity] || 10;
    }
    async getUserCoins(userJid) {
        const db = DatabaseService.getInstance();
        const result = await db.get('SELECT coins FROM user_coins WHERE jid = ?', [userJid]);
        return result?.coins || 0;
    }
    async addUserCoins(userJid, amount) {
        const db = DatabaseService.getInstance();
        await db.run(`INSERT OR IGNORE INTO user_coins (jid, coins) VALUES (?, 1000)`, [userJid]);
        await db.run('UPDATE user_coins SET coins = coins + ? WHERE jid = ?', [amount, userJid]);
    }
    async removeUserCoins(userJid, amount) {
        const db = DatabaseService.getInstance();
        await db.run('UPDATE user_coins SET coins = coins - ? WHERE jid = ?', [amount, userJid]);
    }
}
//# sourceMappingURL=CollectionManagerService.js.map