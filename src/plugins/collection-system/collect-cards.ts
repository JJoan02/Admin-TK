// collect-cards.ts - Sistema súper avanzado
// Categoría: collection-system
// Funcionalidad: Sistema de cartas coleccionables con rareza
// Creado con funcionalidades súper avanzadas

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
import { DatabaseService } from '../../database/DatabaseService.js';

export class CollectCardsPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'collect-cards',
      category: 'collection-system',
      description: 'Sistema de cartas coleccionables con rareza',
      usage: 'collect-cards [opciones]',
      aliases: [],
      permissions: ['user'],
      cooldown: 5000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, user } = context;
    const db = DatabaseService.getInstance();
    const api = InternalAPIService.getInstance();

    try {
      // Verificar perfil RPG si es necesario
      const userProfile = await this.getUserRPGProfile(user.jid);
      
      
      const cardSets = [
        { 
          name: 'Elementos', 
          cards: [
            { name: 'Dragón de Fuego', rarity: 'legendary', power: 100, element: 'Fire' },
            { name: 'Espíritu del Agua', rarity: 'rare', power: 70, element: 'Water' },
            { name: 'Golem de Tierra', rarity: 'uncommon', power: 50, element: 'Earth' }
          ]
        },
        { 
          name: 'Héroes', 
          cards: [
            { name: 'Paladín Sagrado', rarity: 'legendary', power: 95, type: 'Hero' },
            { name: 'Arquero Élfico', rarity: 'rare', power: 65, type: 'Hero' },
            { name: 'Guerrero Bárbaro', rarity: 'common', power: 40, type: 'Hero' }
          ]
        }
      ];
      
      if (args[0] === 'open') {
        const packType = args[1] || 'random';
        const selectedSet = cardSets[Math.floor(Math.random() * cardSets.length)];
        const card = selectedSet.cards[Math.floor(Math.random() * selectedSet.cards.length)];
        
        const rarityChances = { common: 0.6, uncommon: 0.3, rare: 0.08, legendary: 0.02 };
        const pullChance = Math.random();
        
        if (pullChance <= rarityChances[card.rarity]) {
          await this.addToCollection(user.jid, {
            type: 'card',
            id: card.name,
            rarity: card.rarity
          });
          
          await reply(`🎴 *¡Nueva carta obtenida!*\n\n${this.getRarityEmoji(card.rarity)} *${card.name}*\n⚡ Poder: ${card.power}\n🏷️ ${card.element || card.type}\n⭐ Rareza: ${card.rarity}`);
        } else {
          await reply('📦 El sobre estaba vacío... ¡Intenta de nuevo!');
        }
      } else if (args[0] === 'deck') {
        const userCards = await db.all('SELECT * FROM user_collections WHERE jid = ? AND item_type = "card"', [user.jid]);
        if (userCards.length === 0) {
          return await reply('🎴 No tienes cartas. Usa *collect-cards open* para obtener algunas!');
        }
        
        let deckText = '🎴 *Tu Mazo*\n\n';
        userCards.forEach(card => {
          deckText += `${this.getRarityEmoji(card.rarity)} ${card.item_id}\n`;
        });
        
        await reply(deckText);
      }

    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Error en el sistema. Intenta de nuevo.');
    }
  }

  private async getUserRPGProfile(userJid: string): Promise<any> {
    const db = DatabaseService.getInstance();
    return await db.get('SELECT * FROM rpg_users WHERE jid = ?', [userJid]);
  }

  private async updateUserRPG(userJid: string, updates: any): Promise<void> {
    const db = DatabaseService.getInstance();
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    await db.run(`UPDATE rpg_users SET ${fields} WHERE jid = ?`, [...values, userJid]);
  }

  private async addToCollection(userJid: string, item: any): Promise<void> {
    const db = DatabaseService.getInstance();
    await db.run(
      'INSERT INTO user_collections (jid, item_type, item_id, rarity, obtained_at) VALUES (?, ?, ?, ?, ?)',
      [userJid, item.type, item.id, item.rarity, new Date().toISOString()]
    );
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

  private getItemEmoji(itemType: string): string {
    const emojis = {
      'weapon': '⚔️',
      'armor': '🛡️',
      'potion': '🧪',
      'accessory': '💍',
      'card': '🎴',
      'pokemon': '🎯'
    };
    return emojis[itemType] || '📦';
  }
}

// Exportar para compatibilidad
const handler = async (m: any, { conn, args, usedPrefix, command }: any) => {
  const plugin = new CollectCardsPlugin();
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

handler.command = ['collect-cards'];
export default handler;