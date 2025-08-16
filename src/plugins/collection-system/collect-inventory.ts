// collect-inventory.ts - Sistema definitivo de colección
// Categoría: collection-system
// Funcionalidad: Inventario visual con carrusel de imágenes
// Sistema avanzado con scraper e inventario visual

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
import { DatabaseService } from '../../database/DatabaseService.js';
import { CollectionManagerService } from '../../services/CollectionManagerService.js';

export class CollectInventoryPlugin extends BasePlugin {
  private collectionManager: CollectionManagerService;

  constructor() {
    super({
      name: 'collect-inventory',
      category: 'collection-system',
      description: 'Inventario visual con carrusel de imágenes',
      usage: 'collect-inventory [opciones]',
      aliases: [],
      permissions: ['user'],
      cooldown: 10000
    });
    
    this.collectionManager = CollectionManagerService.getInstance();
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, user } = context;
    const db = DatabaseService.getInstance();
    const api = InternalAPIService.getInstance();

    try {
      
      const page = parseInt(args[0]) || 1;
      const itemsPerPage = 6;
      const offset = (page - 1) * itemsPerPage;

      const userItems = await db.all(
        'SELECT * FROM user_collections WHERE jid = ? ORDER BY obtained_at DESC LIMIT ? OFFSET ?',
        [user.jid, itemsPerPage, offset]
      );

      const totalItems = await db.get('SELECT COUNT(*) as count FROM user_collections WHERE jid = ?', [user.jid]);
      const totalPages = Math.ceil(totalItems.count / itemsPerPage);

      if (userItems.length === 0) {
        return await reply('📦 *Tu inventario está vacío*\n\nUsa *collect-summon <tipo>* para obtener items!');
      }

      // Crear carrusel de imágenes
      const carouselImages = [];
      let inventoryText = `📦 *Tu Inventario* (Página ${page}/${totalPages})\n\n`;

      for (let i = 0; i < userItems.length; i++) {
        const item = userItems[i];
        inventoryText += `${i + 1}. ${this.getRarityEmoji(item.rarity)} *${item.item_name}*\n`;
        inventoryText += `   💰 Valor: ${item.market_value} monedas\n`;
        inventoryText += `   🆔 ${item.item_id}\n\n`;

        // Añadir imagen al carrusel
        if (item.image_url) {
          carouselImages.push({
            url: item.image_url,
            caption: `${this.getRarityEmoji(item.rarity)} *${item.item_name}*\n📝 ${item.item_description}\n⭐ ${item.rarity}\n💰 ${item.market_value} monedas`
          });
        }
      }

      inventoryText += `📊 *Total items:* ${totalItems.count}\n`;
      if (totalPages > 1) {
        inventoryText += `📄 Usa *collect-inventory ${page + 1}* para la siguiente página`;
      }

      // Enviar carrusel si hay imágenes
      if (carouselImages.length > 0) {
        for (const img of carouselImages) {
          await conn.sendMessage(message.chat, {
            image: { url: img.url },
            caption: img.caption
          }, { quoted: message });
          
          // Pequeña pausa entre imágenes
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      await reply(inventoryText);

    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Error en el sistema de colección. Intenta de nuevo.');
    }
  }

  private async scrapePinterestImage(keywords: string[]): Promise<any | null> {
    return await this.collectionManager.scrapePinterestImage(keywords);
  }

  private async downloadAndSaveImage(imageUrl: string, type: string, userJid: string): Promise<any> {
    return await this.collectionManager.downloadAndSaveImage(imageUrl, type, userJid);
  }

  private calculateMarketValue(rarity: string): number {
    return this.collectionManager.calculateMarketValue(rarity);
  }

  private async getUserCoins(userJid: string): Promise<number> {
    return await this.collectionManager.getUserCoins(userJid);
  }

  private async addUserCoins(userJid: string, amount: number): Promise<void> {
    await this.collectionManager.addUserCoins(userJid, amount);
  }

  private async removeUserCoins(userJid: string, amount: number): Promise<void> {
    await this.collectionManager.removeUserCoins(userJid, amount);
  }

  private getRarityEmoji(rarity: string): string {
    const rarities = {
      'common': '⚪',
      'uncommon': '🟢', 
      'rare': '🔵',
      'epic': '🟣',
      'legendary': '🟡',
      'mythical': '🔴'
    };
    return rarities[rarity] || '⚪';
  }
}

// Exportar para compatibilidad
const handler = async (m: any, { conn, args, usedPrefix, command }: any) => {
  const plugin = new CollectInventoryPlugin();
  await plugin.execute({
    message: m,
    args,
    reply: (msg: string) => conn.reply(m.chat, msg, m),
    conn,
    user: { jid: m.sender },
    usedPrefix,
    command
  });
};

handler.command = ['collect-inventory'];
export default handler;