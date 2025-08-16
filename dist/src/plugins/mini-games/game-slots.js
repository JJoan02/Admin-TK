// game-slots.ts - Sistema súper avanzado
// Categoría: mini-games
// Funcionalidad: Máquina tragamonedas con premios
// Creado con funcionalidades súper avanzadas
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
import { DatabaseService } from '../../database/DatabaseService.js';
export class GameSlotsPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'game-slots',
            category: 'mini-games',
            description: 'Máquina tragamonedas con premios',
            usage: 'game-slots [opciones]',
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
            const symbols = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎', '7️⃣'];
            const bet = parseInt(args[0]) || 10;
            if (bet < 10)
                return await reply('💰 Apuesta mínima: 10 oro');
            if (userProfile.gold < bet)
                return await reply('💰 No tienes suficiente oro');
            const slot1 = symbols[Math.floor(Math.random() * symbols.length)];
            const slot2 = symbols[Math.floor(Math.random() * symbols.length)];
            const slot3 = symbols[Math.floor(Math.random() * symbols.length)];
            let winnings = 0;
            let result = '';
            if (slot1 === slot2 && slot2 === slot3) {
                // Triple
                if (slot1 === '💎')
                    winnings = bet * 10;
                else if (slot1 === '7️⃣')
                    winnings = bet * 8;
                else if (slot1 === '⭐')
                    winnings = bet * 6;
                else
                    winnings = bet * 4;
                result = '🎰 *¡TRIPLE! ¡GRAN PREMIO!*';
            }
            else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
                // Par
                winnings = bet * 2;
                result = '🎰 *¡Par! ¡Premio menor!*';
            }
            else {
                // Pérdida
                winnings = -bet;
                result = '🎰 *Sin suerte esta vez...*';
            }
            await this.updateUserRPG(user.jid, { gold: userProfile.gold + winnings });
            const slotResult = `🎰 *TRAGAMONEDAS*\n\n[ ${slot1} | ${slot2} | ${slot3} ]\n\n${result}\n💰 ${winnings > 0 ? '+' : ''}${winnings} oro\n\n💳 Oro actual: ${userProfile.gold + winnings}`;
            await reply(slotResult);
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
    const plugin = new GameSlotsPlugin();
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
handler.command = ['game-slots'];
export default handler;
//# sourceMappingURL=game-slots.js.map