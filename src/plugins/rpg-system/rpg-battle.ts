// rpg-battle.ts - Sistema RPG avanzado
// Categoría: rpg-system
// Funcionalidad: Sistema de batallas RPG con enemigos y recompensas
// Creado con funcionalidades avanzadas

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
import { DatabaseService } from '../../database/DatabaseService.js';

export class RpgBattlePlugin extends BasePlugin {
  constructor() {
    super({
      name: 'rpg-battle',
      category: 'rpg-system',
      description: 'Sistema de batallas RPG con enemigos y recompensas',
      usage: 'rpg-battle [opciones]',
      aliases: [],
      permissions: ['user'],
      cooldown: 5000,
      rpgRequired: true
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, user } = context;
    const db = DatabaseService.getInstance();
    const api = InternalAPIService.getInstance();

    try {
      // Verificar si el usuario tiene perfil RPG
      const userProfile = await this.getUserRPGProfile(user.jid);
      if (!userProfile) {
        return await reply('🎮 Primero debes crear tu perfil RPG con *.rpg register*');
      }

      
      const enemies = [
        { name: 'Slime', hp: 30, attack: 5, defense: 2, exp: 25, gold: 10 },
        { name: 'Goblin', hp: 50, attack: 8, defense: 4, exp: 40, gold: 20 },
        { name: 'Orc', hp: 80, attack: 12, defense: 6, exp: 60, gold: 35 },
        { name: 'Dragon', hp: 200, attack: 25, defense: 15, exp: 200, gold: 100 }
      ];
      
      const enemy = enemies[Math.floor(Math.random() * enemies.length)];
      const playerAttack = userProfile.strength + Math.floor(Math.random() * 10);
      const enemyAttack = enemy.attack + Math.floor(Math.random() * 5);
      
      let battleResult = '';
      if (playerAttack > enemy.defense) {
        battleResult = `⚔️ *¡Victoria!*\n\nDerrotaste a ${enemy.name}\n💰 +${enemy.gold} oro\n⭐ +${enemy.exp} EXP`;
        await this.updateUserRPG(user.jid, {
          gold: userProfile.gold + enemy.gold,
          exp: userProfile.exp + enemy.exp
        });
      } else {
        battleResult = `💀 *Derrota*\n\n${enemy.name} te derrotó\n❤️ -10 HP`;
        await this.updateUserRPG(user.jid, {
          hp: Math.max(0, userProfile.hp - 10)
        });
      }
      
      await reply(battleResult);

    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Error en el sistema RPG. Intenta de nuevo.');
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
}

// Exportar para compatibilidad
const handler = async (m: any, { conn, args, usedPrefix, command }: any) => {
  const plugin = new RpgBattlePlugin();
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

handler.command = ['rpg-battle'];
export default handler;