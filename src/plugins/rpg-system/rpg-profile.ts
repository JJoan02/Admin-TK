// rpg-profile.ts - Sistema RPG avanzado
// Categoría: rpg-system
// Funcionalidad: Perfil RPG completo con estadísticas y progreso
// Creado con funcionalidades avanzadas

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
import { DatabaseService } from '../../database/DatabaseService.js';

export class RpgProfilePlugin extends BasePlugin {
  constructor() {
    super({
      name: 'rpg-profile',
      category: 'rpg-system',
      description: 'Perfil RPG completo con estadísticas y progreso',
      usage: 'rpg-profile [opciones]',
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

      
      if (args[0] === 'register') {
        // Crear nuevo perfil RPG
        const newProfile = {
          jid: user.jid,
          name: user.name || 'Aventurero',
          level: 1,
          exp: 0,
          hp: 100,
          mp: 50,
          strength: 10,
          defense: 10,
          agility: 10,
          intelligence: 10,
          gold: 100,
          class: 'Novato',
          created_at: new Date().toISOString()
        };
        
        await db.run(`INSERT INTO rpg_users (jid, name, level, exp, hp, mp, strength, defense, agility, intelligence, gold, class, created_at) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                     Object.values(newProfile));
        
        await reply(`🎮 *¡Perfil RPG creado!*\n\n👤 *Nombre:* ${newProfile.name}\n⭐ *Nivel:* ${newProfile.level}\n💰 *Oro:* ${newProfile.gold}\n🗡️ *Clase:* ${newProfile.class}`);
      } else {
        // Mostrar perfil existente
        const profile = userProfile;
        const progressBar = this.createProgressBar(profile.exp % 1000, 1000);
        
        await reply(`🎮 *Perfil RPG*\n\n👤 *${profile.name}*\n⭐ *Nivel:* ${profile.level}\n📊 *EXP:* ${profile.exp} ${progressBar}\n❤️ *HP:* ${profile.hp}/${profile.hp}\n💙 *MP:* ${profile.mp}/${profile.mp}\n\n⚔️ *Estadísticas:*\n🗡️ Fuerza: ${profile.strength}\n🛡️ Defensa: ${profile.defense}\n⚡ Agilidad: ${profile.agility}\n🧠 Inteligencia: ${profile.intelligence}\n\n💰 *Oro:* ${profile.gold}\n🎭 *Clase:* ${profile.class}`);
      }

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
  const plugin = new RpgProfilePlugin();
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

handler.command = ['rpg-profile'];
export default handler;