// rpg-inventory.ts - Sistema súper avanzado
// Categoría: rpg-system
// Funcionalidad: Sistema de inventario con items y equipamiento
// Creado con funcionalidades súper avanzadas

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
import { DatabaseService } from '../../database/DatabaseService.js';

export class RpgInventoryPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'rpg-inventory',
      category: 'rpg-system',
      description: 'Sistema de inventario con items y equipamiento',
      usage: 'rpg-inventory [opciones]',
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
      
      
      if (args[0] === 'show' || !args[0]) {
        const inventory = await db.all('SELECT * FROM rpg_inventory WHERE jid = ?', [user.jid]);
        if (inventory.length === 0) {
          return await reply('🎒 *Tu inventario está vacío*\n\nConsigue items luchando contra enemigos!');
        }
        
        let inventoryText = '🎒 *Tu Inventario*\n\n';
        const groupedItems = {};
        inventory.forEach(item => {
          if (!groupedItems[item.item_name]) {
            groupedItems[item.item_name] = { ...item, total: 0 };
          }
          groupedItems[item.item_name].total += item.quantity;
        });
        
        Object.values(groupedItems).forEach(item => {
          const emoji = this.getItemEmoji(item.item_type);
          inventoryText += `${emoji} *${item.item_name}* x${item.total}\n`;
        });
        
        await reply(inventoryText);
      } else if (args[0] === 'use') {
        const itemName = args.slice(1).join(' ');
        if (!itemName) return await reply('❓ Especifica qué item usar');
        
        const item = await db.get('SELECT * FROM rpg_inventory WHERE jid = ? AND item_name = ?', [user.jid, itemName]);
        if (!item) return await reply('❌ No tienes ese item');
        
        const useResult = await this.useItem(user.jid, item);
        await reply(useResult);
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
  const plugin = new RpgInventoryPlugin();
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

handler.command = ['rpg-inventory'];
export default handler;