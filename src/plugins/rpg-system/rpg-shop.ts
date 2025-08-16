// rpg-shop.ts - Sistema súper avanzado
// Categoría: rpg-system
// Funcionalidad: Tienda RPG con items, armas y pociones
// Creado con funcionalidades súper avanzadas

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
import { DatabaseService } from '../../database/DatabaseService.js';

export class RpgShopPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'rpg-shop',
      category: 'rpg-system',
      description: 'Tienda RPG con items, armas y pociones',
      usage: 'rpg-shop [opciones]',
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
      
      
      const shopItems = [
        { name: 'Poción de Vida', type: 'potion', price: 50, effect: 'heal', value: 50 },
        { name: 'Espada de Hierro', type: 'weapon', price: 200, effect: 'strength', value: 5 },
        { name: 'Armadura de Cuero', type: 'armor', price: 150, effect: 'defense', value: 3 },
        { name: 'Anillo de Maná', type: 'accessory', price: 300, effect: 'mp', value: 25 }
      ];
      
      if (args[0] === 'buy') {
        const itemName = args.slice(1).join(' ');
        const item = shopItems.find(i => i.name.toLowerCase() === itemName.toLowerCase());
        
        if (!item) return await reply('❌ Item no encontrado en la tienda');
        if (userProfile.gold < item.price) return await reply(`💰 Necesitas ${item.price} oro para comprar ${item.name}`);
        
        await this.updateUserRPG(user.jid, { gold: userProfile.gold - item.price });
        await db.run('INSERT INTO rpg_inventory (jid, item_name, item_type, quantity) VALUES (?, ?, ?, 1)', 
                    [user.jid, item.name, item.type]);
        
        await reply(`✅ *Compra exitosa!*\n\n🛍️ Compraste: ${item.name}\n💰 Oro restante: ${userProfile.gold - item.price}`);
      } else {
        let shopText = '🏪 *Tienda RPG*\n\n';
        shopItems.forEach(item => {
          const emoji = this.getItemEmoji(item.type);
          shopText += `${emoji} *${item.name}*\n💰 Precio: ${item.price} oro\n📝 ${item.effect}: +${item.value}\n\n`;
        });
        shopText += `💰 *Tu oro:* ${userProfile.gold}\n\nUsa *rpg-shop buy <item>* para comprar`;
        await reply(shopText);
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
  const plugin = new RpgShopPlugin();
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

handler.command = ['rpg-shop'];
export default handler;