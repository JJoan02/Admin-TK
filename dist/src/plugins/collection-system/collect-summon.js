// collect-summon.ts - Sistema definitivo de colección
// Categoría: collection-system
// Funcionalidad: Sistema de invocación con scraper de Pinterest
// Sistema avanzado con scraper e inventario visual
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
import { DatabaseService } from '../../database/DatabaseService.js';
import { CollectionManagerService } from '../../services/CollectionManagerService.js';
export class CollectSummonPlugin extends BasePlugin {
    collectionManager;
    constructor() {
        super({
            name: 'collect-summon',
            category: 'collection-system',
            description: 'Sistema de invocación con scraper de Pinterest',
            usage: 'collect-summon [opciones]',
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
            const summonTypes = {
                'anime-girl': {
                    keywords: ['anime girl', 'waifu', 'anime character female'],
                    rarity: { common: 0.5, rare: 0.3, epic: 0.15, legendary: 0.05 },
                    description: 'Una hermosa chica anime'
                },
                'pokemon': {
                    keywords: ['pokemon', 'cute pokemon', 'pokemon art'],
                    rarity: { common: 0.6, rare: 0.25, epic: 0.12, legendary: 0.03 },
                    description: 'Una criatura Pokémon'
                },
                'elf-girl': {
                    keywords: ['elf girl', 'fantasy elf', 'anime elf'],
                    rarity: { common: 0.4, rare: 0.35, epic: 0.2, legendary: 0.05 },
                    description: 'Una elegante elfa'
                },
                'fantasy-girl': {
                    keywords: ['fantasy girl', 'fantasy woman', 'magical girl'],
                    rarity: { common: 0.45, rare: 0.3, epic: 0.2, legendary: 0.05 },
                    description: 'Una chica de fantasía'
                },
                'nsfw-girl': {
                    keywords: ['beautiful woman', 'attractive girl', 'model'],
                    rarity: { common: 0.3, rare: 0.4, epic: 0.25, legendary: 0.05 },
                    description: 'Una hermosa mujer',
                    nsfw: true
                }
            };
            const type = args[0] || 'anime-girl';
            if (!summonTypes[type]) {
                const availableTypes = Object.keys(summonTypes).join(', ');
                return await reply(`❓ Tipos disponibles: ${availableTypes}`);
            }
            const summonData = summonTypes[type];
            // Verificar si es NSFW y el chat lo permite
            if (summonData.nsfw && !message.isGroup) {
                return await reply('🔞 Contenido NSFW solo disponible en chats privados');
            }
            await reply('✨ Invocando... Por favor espera...');
            try {
                // Scraper de Pinterest
                const imageData = await this.scrapePinterestImage(summonData.keywords);
                if (!imageData) {
                    return await reply('❌ No se pudo obtener imagen. Intenta de nuevo.');
                }
                // Determinar rareza
                const rarityRoll = Math.random();
                let rarity = 'common';
                let cumulativeChance = 0;
                for (const [rarityType, chance] of Object.entries(summonData.rarity)) {
                    cumulativeChance += chance;
                    if (rarityRoll <= cumulativeChance) {
                        rarity = rarityType;
                        break;
                    }
                }
                // Descargar y guardar imagen
                const savedImage = await this.downloadAndSaveImage(imageData.url, type, user.jid);
                // Crear item de colección
                const collectionItem = {
                    id: `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                    type: type,
                    name: imageData.title || `${summonData.description} ${rarity}`,
                    description: imageData.description || summonData.description,
                    rarity: rarity,
                    image_url: imageData.url,
                    local_path: savedImage.path,
                    obtained_at: new Date().toISOString(),
                    owner: user.jid,
                    tradeable: true,
                    market_value: this.calculateMarketValue(rarity)
                };
                // Guardar en base de datos
                await db.run(`INSERT INTO user_collections 
          (jid, item_id, item_type, item_name, item_description, rarity, image_url, local_path, market_value, obtained_at) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [user.jid, collectionItem.id, collectionItem.type, collectionItem.name,
                    collectionItem.description, collectionItem.rarity, collectionItem.image_url,
                    collectionItem.local_path, collectionItem.market_value, collectionItem.obtained_at]);
                // Enviar resultado con imagen
                await conn.sendMessage(message.chat, {
                    image: { url: imageData.url },
                    caption: `✨ *¡Nueva invocación!*\n\n${this.getRarityEmoji(rarity)} *${collectionItem.name}*\n📝 ${collectionItem.description}\n⭐ Rareza: ${rarity}\n💰 Valor: ${collectionItem.market_value} monedas\n🆔 ID: ${collectionItem.id}`
                }, { quoted: message });
            }
            catch (error) {
                console.error('Error en invocación:', error);
                await reply('❌ Error durante la invocación. Intenta de nuevo.');
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
    const plugin = new CollectSummonPlugin();
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
handler.command = ['collect-summon'];
export default handler;
//# sourceMappingURL=collect-summon.js.map