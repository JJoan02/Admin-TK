// src/services/SearchService.js

import { createClient } from 'pexels';
import puppeteer from 'puppeteer';
import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();

// Inicializa el cliente de Pexels solo si la clave de API existe en .env
const pexelsClient = process.env.PEXELS_API_KEY ? createClient(process.env.PEXELS_API_KEY) : null;

// Opciones de Puppeteer para optimizar el rendimiento en servidores
const puppeteerOptions = {
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--no-first-run',
    '--no-zygote',
    '--disable-gpu'
  ],
};

class SearchService {
  /**
   * Busca fotos de alta calidad en Pexels.
   * @param {string} query - El término de búsqueda.
   * @returns {Promise<string|null>} La URL de la imagen o null.
   */
  static async searchPexels(query) {
    if (!pexelsClient) {
      logger.warn('⚠️ Pexels API Key no configurada. Saltando búsqueda en Pexels.');
      return null;
    }
    if (typeof query !== 'string' || query.trim() === '') {
      logger.warn('searchPexels llamado con query vacío o inválido.');
      return null;
    }
    logger.info(`📸 Buscando en Pexels: "${query}"`);
    try {
      const response = await pexelsClient.photos.search({ query, per_page: 1 });
      if (response && Array.isArray(response.photos) && response.photos.length > 0) {
        const imageUrl = response.photos[0].src.large2x;
        logger.info(`✅ Imagen encontrada en Pexels: ${imageUrl}`);
        return imageUrl;
      }
      logger.info(`ℹ️ No se encontraron imágenes en Pexels para: "${query}"`);
      return null;
    } catch (error) {
      logger.error({ err: error, query }, `❌ Error buscando en Pexels para: "${query}"`);
      return null;
    }
  }

  /**
   * Busca cualquier imagen en Google Imágenes usando Puppeteer.
   * @param {string} query - El término de búsqueda.
   * @returns {Promise<string|null>} La URL de la imagen o null.
   */
  static async searchGoogleImages(query) {
    if (typeof query !== 'string' || query.trim() === '') {
      logger.warn('searchGoogleImages llamado con query vacío o inválido.');
      return null;
    }
    logger.info(`🖼️ Buscando en Google Imágenes: "${query}"`);
    let browser = null;
    try {
      browser = await puppeteer.launch(puppeteerOptions);
      const page = await browser.newPage();

      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch`;
      await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 30000 }); // Aumentar timeout

      // Esperar por un selector más robusto o por un tiempo fijo si el selector es inconsistente
      // Intentar con varios selectores comunes para imágenes de Google
      const imageUrl = await page.evaluate(() => {
        const selectors = [
          'img[jsname]', // Selector común para imágenes principales
          'img.Q4LuWd', // Otro selector común
          'img[alt^="Image result for"]', // Selector basado en el atributo alt
        ];
        for (const selector of selectors) {
          const img = document.querySelector(selector);
          if (img && (img.src || img.getAttribute('data-src'))) {
            return img.src || img.getAttribute('data-src');
          }
        }
        return null;
      });

      if (imageUrl && imageUrl.startsWith('http')) {
        logger.info(`✅ Imagen encontrada en Google: ${imageUrl}`);
        return imageUrl;
      }
      logger.info(`ℹ️ No se encontraron imágenes en Google para: "${query}"`);
      return null;
    } catch (error) {
      logger.error({ err: error, query }, `❌ Error haciendo scraping en Google Imágenes para: "${query}"`);
      return null;
    } finally {
      if (browser) {
        try {
          await browser.close();
        } catch (closeErr) {
          logger.error({ err: closeErr }, '❌ Error al cerrar el navegador Puppeteer.');
        }
      }
    }
  }
}

export default SearchService;
