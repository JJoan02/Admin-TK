// collect-market.ts - Sistema definitivo de colección
// Categoría: collection-system
// Funcionalidad: Mercado de intercambio y ventas
// Sistema avanzado con scraper e inventario visual
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
import { DatabaseService } from '../../database/DatabaseService.js';
import { CollectionManagerService } from '../../services/CollectionManagerService.js';
export class CollectMarketPlugin extends BasePlugin {
    collectionManager;
    constructor() {
        super({
            name: 'collect-market',
            category: 'collection-system',
            description: 'Mercado de intercambio y ventas',
            usage: 'collect-market [opciones]',
            aliases: [],
            permissions: ['user'],
            cooldown: 10000
        });
        this.collectionManager = CollectionManagerService.getInstance();
    }
    async execute(context) {
        const { message, args, reply, conn, user } = context;
        const db = DatabaseService.getInstance();
        const api = InternalAPIService.getInstance();
        try {
            if (args[0] === 'sell') {
                const itemId = args[1];
                if (!itemId)
                    return await reply('❓ Especifica el ID del item a vender');
                const item = await db.get('SELECT * FROM user_collections WHERE jid = ? AND item_id = ?', [user.jid, itemId]);
                if (!item)
                    return await reply('❌ No tienes ese item');
                const salePrice = Math.floor(item.market_value * 0.8); // 80% del valor de mercado
                // Crear venta en el mercado
                await db.run(`INSERT INTO market_listings 
          (seller_jid, item_id, item_name, item_type, rarity, image_url, price, listed_at) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [user.jid, item.item_id, item.item_name, item.item_type, item.rarity, item.image_url, salePrice, new Date().toISOString()]);
                // Remover del inventario del usuario
                await db.run('DELETE FROM user_collections WHERE jid = ? AND item_id = ?', [user.jid, itemId]);
                await reply(`💰 *Item puesto en venta*\n\n📦 ${item.item_name}\n💵 Precio: ${salePrice} monedas\n\n¡Otros usuarios pueden comprarlo ahora!`);
            }
            else if (args[0] === 'buy') {
                const listingId = args[1];
                if (!listingId)
                    return await reply('❓ Especifica el ID de la venta');
                const listing = await db.get('SELECT * FROM market_listings WHERE id = ?', [listingId]);
                if (!listing)
                    return await reply('❌ Venta no encontrada');
                const buyerCoins = await this.getUserCoins(user.jid);
                if (buyerCoins < listing.price) {
                    return await reply(`💰 Necesitas ${listing.price} monedas para comprar este item`);
                }
                // Transferir item al comprador
                await db.run(`INSERT INTO user_collections 
          (jid, item_id, item_type, item_name, item_description, rarity, image_url, local_path, market_value, obtained_at) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [user.jid, listing.item_id, listing.item_type, listing.item_name, 'Comprado en el mercado',
                    listing.rarity, listing.image_url, null, listing.price, new Date().toISOString()]);
                // Pagar al vendedor
                await this.addUserCoins(listing.seller_jid, listing.price);
                await this.removeUserCoins(user.jid, listing.price);
                // Remover del mercado
                await db.run('DELETE FROM market_listings WHERE id = ?', [listingId]);
                await reply(`✅ *¡Compra exitosa!*\n\n📦 Compraste: ${listing.item_name}\n💰 Pagaste: ${listing.price} monedas`);
            }
            else {
                // Mostrar mercado
                const listings = await db.all('SELECT * FROM market_listings ORDER BY listed_at DESC LIMIT 10');
                if (listings.length === 0) {
                    return await reply('🏪 *El mercado está vacío*\n\nUsa *collect-market sell <item_id>* para vender items');
                }
                let marketText = '🏪 *Mercado de Colecciones*\n\n';
                listings.forEach((listing, index) => {
                    marketText += `${index + 1}. ${this.getRarityEmoji(listing.rarity)} *${listing.item_name}*\n`;
                    marketText += `   💰 Precio: ${listing.price} monedas\n`;
                    marketText += `   🆔 ID: ${listing.id}\n\n`;
                });
                marketText += 'Usa *collect-market buy <id>* para comprar';
                await reply(marketText);
            }
        }
        catch (error) {
            console.error(`Error en ${this.name}:`, error);
            await reply('❌ Error en el sistema de colección. Intenta de nuevo.');
        }
    }
    async scrapePinterestImage(keywords) {
        return await this.collectionManager.scrapePinterestImage(keywords);
    }
    async downloadAndSaveImage(imageUrl, type, userJid) {
        return await this.collectionManager.downloadAndSaveImage(imageUrl, type, userJid);
    }
    calculateMarketValue(rarity) {
        return this.collectionManager.calculateMarketValue(rarity);
    }
    async getUserCoins(userJid) {
        return await this.collectionManager.getUserCoins(userJid);
    }
    async addUserCoins(userJid, amount) {
        await this.collectionManager.addUserCoins(userJid, amount);
    }
    async removeUserCoins(userJid, amount) {
        await this.collectionManager.removeUserCoins(userJid, amount);
    }
    getRarityEmoji(rarity) {
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
const handler = async (m, { conn, args, usedPrefix, command }) => {
    const plugin = new CollectMarketPlugin();
    await plugin.execute({
        message: m,
        args,
        reply: (msg) => conn.reply(m.chat, msg, m),
        conn,
        user: { jid: m.sender },
        usedPrefix,
        command
    });
};
handler.command = ['collect-market'];
export default handler;
//# sourceMappingURL=collect-market.js.map