
// src/services/PinterestScraperService.ts - Scraper de Pinterest
import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';

export class PinterestScraperService {
  private static instance: PinterestScraperService;
  
  static getInstance(): PinterestScraperService {
    if (!this.instance) {
      this.instance = new PinterestScraperService();
    }
    return this.instance;
  }

  async searchImages(keywords: string[], limit: number = 20): Promise<any[]> {
    try {
      const query = keywords.join(' ');
      const searchUrl = `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query)}`;
      
      const response = await axios.get(searchUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      const $ = cheerio.load(response.data);
      const images = [];

      // Extraer URLs de imágenes de Pinterest
      $('img').each((i, elem) => {
        if (i >= limit) return false;
        
        const src = $(elem).attr('src');
        const alt = $(elem).attr('alt') || '';
        
        if (src && src.includes('pinimg.com')) {
          images.push({
            url: src,
            title: alt,
            description: alt,
            source: 'pinterest'
          });
        }
      });

      return images;
    } catch (error) {
      console.error('Error scraping Pinterest:', error);
      return [];
    }
  }

  async downloadImage(imageUrl: string, filename: string, directory: string): Promise<string | null> {
    try {
      // Crear directorio si no existe
      await fs.mkdir(directory, { recursive: true });
      
      const response = await axios.get(imageUrl, { responseType: 'stream' });
      const filePath = path.join(directory, filename);
      
      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);
      
      return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(filePath));
        writer.on('error', reject);
      });
    } catch (error) {
      console.error('Error downloading image:', error);
      return null;
    }
  }
}