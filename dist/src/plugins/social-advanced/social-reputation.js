// social-reputation.ts - Sistema súper avanzado
// Categoría: social-advanced
// Funcionalidad: Sistema de reputación y karma
// Creado con funcionalidades súper avanzadas
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
import { DatabaseService } from '../../database/DatabaseService.js';
export class SocialReputationPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'social-reputation',
            category: 'social-advanced',
            description: 'Sistema de reputación y karma',
            usage: 'social-reputation [opciones]',
            aliases: [],
            permissions: ['user'],
            cooldown: 5000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, user } = context;
        const db = DatabaseService.getInstance();
        const api = InternalAPIService.getInstance();
        try {
            // Verificar perfil RPG si es necesario
            const userProfile = await this.getUserRPGProfile(user.jid);
            if (args[0] === 'give') {
                const targetUser = message.mentionedJid?.[0];
                if (!targetUser)
                    return await reply('❓ Menciona al usuario');
                if (targetUser === user.jid)
                    return await reply('❌ No puedes darte reputación a ti mismo');
                const lastGiven = await db.get('SELECT * FROM reputation_given WHERE from_user = ? AND to_user = ? AND given_at > ?', [user.jid, targetUser, Date.now() - 86400000]); // 24 horas
                if (lastGiven)
                    return await reply('⏰ Solo puedes dar reputación una vez cada 24 horas al mismo usuario');
                const points = Math.floor(Math.random() * 3) + 1; // 1-3 puntos
                await db.run('INSERT INTO reputation_given (from_user, to_user, points, given_at) VALUES (?, ?, ?, ?)', [user.jid, targetUser, points, Date.now()]);
                await db.run('INSERT OR IGNORE INTO user_reputation (jid, points) VALUES (?, 0)', [targetUser]);
                await db.run('UPDATE user_reputation SET points = points + ? WHERE jid = ?', [points, targetUser]);
                await reply(`⭐ *Reputación otorgada*\n\n👤 @${targetUser.split('@')[0]}\n📈 +${points} puntos de reputación`, { mentions: [targetUser] });
            }
            else {
                const targetUser = message.mentionedJid?.[0] || user.jid;
                const reputation = await db.get('SELECT * FROM user_reputation WHERE jid = ?', [targetUser]);
                const points = reputation?.points || 0;
                let rank = 'Novato';
                if (points >= 100)
                    rank = 'Respetado';
                if (points >= 500)
                    rank = 'Veterano';
                if (points >= 1000)
                    rank = 'Leyenda';
                await reply(`⭐ *Reputación*\n\n👤 @${targetUser.split('@')[0]}\n📊 ${points} puntos\n🏆 Rango: ${rank}`, { mentions: [targetUser] });
            }
        }
        catch (error) {
            console.error(`Error en ${this.name}:`, error);
            await reply('❌ Error en el sistema. Intenta de nuevo.');
        }
    }
    async getUserRPGProfile(userJid) {
        const db = DatabaseService.getInstance();
        return await db.get('SELECT * FROM rpg_users WHERE jid = ?', [userJid]);
    }
    async updateUserRPG(userJid, updates) {
        const db = DatabaseService.getInstance();
        const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
        const values = Object.values(updates);
        await db.run(`UPDATE rpg_users SET ${fields} WHERE jid = ?`, [...values, userJid]);
    }
    async addToCollection(userJid, item) {
        const db = DatabaseService.getInstance();
        await db.run('INSERT INTO user_collections (jid, item_type, item_id, rarity, obtained_at) VALUES (?, ?, ?, ?, ?)', [userJid, item.type, item.id, item.rarity, new Date().toISOString()]);
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
    getItemEmoji(itemType) {
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
const handler = async (m, { conn, args, usedPrefix, command }) => {
    const plugin = new SocialReputationPlugin();
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
handler.command = ['social-reputation'];
export default handler;
//# sourceMappingURL=social-reputation.js.map