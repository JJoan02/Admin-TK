// collect-trade.ts - Sistema definitivo de colección
// Categoría: collection-system
// Funcionalidad: Sistema de intercambio directo mejorado
// Sistema avanzado con scraper e inventario visual
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
import { DatabaseService } from '../../database/DatabaseService.js';
import { CollectionManagerService } from '../../services/CollectionManagerService.js';
export class CollectTradePlugin extends BasePlugin {
    collectionManager;
    constructor() {
        super({
            name: 'collect-trade',
            category: 'collection-system',
            description: 'Sistema de intercambio directo mejorado',
            usage: 'collect-trade [opciones]',
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
            if (args[0] === 'offer') {
                const targetUser = message.mentionedJid?.[0];
                const itemId = args[1];
                if (!targetUser)
                    return await reply('❓ Menciona al usuario');
                if (!itemId)
                    return await reply('❓ Especifica el ID del item');
                const item = await db.get('SELECT * FROM user_collections WHERE jid = ? AND item_id = ?', [user.jid, itemId]);
                if (!item)
                    return await reply('❌ No tienes ese item');
                // Crear oferta de intercambio
                await db.run(`INSERT INTO trade_offers 
          (from_user, to_user, offered_item_id, offered_item_name, offered_item_image, status, created_at) 
          VALUES (?, ?, ?, ?, ?, 'pending', ?)`, [user.jid, targetUser, item.item_id, item.item_name, item.image_url, new Date().toISOString()]);
                // Enviar imagen del item ofrecido
                await conn.sendMessage(message.chat, {
                    image: { url: item.image_url },
                    caption: `🤝 *Oferta de intercambio*\n\n📤 @${user.jid.split('@')[0]} ofrece:\n${this.getRarityEmoji(item.rarity)} *${item.item_name}*\n\n👤 Para: @${targetUser.split('@')[0]}\n\nUsa *collect-trade accept* para aceptar`,
                    mentions: [user.jid, targetUser]
                }, { quoted: message });
            }
            else if (args[0] === 'accept') {
                const pendingTrade = await db.get(`SELECT * FROM trade_offers 
          WHERE to_user = ? AND status = 'pending' ORDER BY created_at DESC LIMIT 1`, [user.jid]);
                if (!pendingTrade)
                    return await reply('❌ No tienes ofertas pendientes');
                // Completar intercambio
                await db.run('UPDATE trade_offers SET status = "completed" WHERE id = ?', [pendingTrade.id]);
                // Transferir item
                await db.run(`UPDATE user_collections SET jid = ? WHERE item_id = ?`, [user.jid, pendingTrade.offered_item_id]);
                await reply(`✅ *¡Intercambio completado!*\n\n🎉 Recibiste: ${pendingTrade.offered_item_name}`);
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
    const plugin = new CollectTradePlugin();
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
handler.command = ['collect-trade'];
export default handler;
//# sourceMappingURL=collect-trade.js.map