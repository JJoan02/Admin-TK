// game-trivia.ts - Sistema súper avanzado
// Categoría: mini-games
// Funcionalidad: Juego de trivia con múltiples categorías
// Creado con funcionalidades súper avanzadas
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
import { DatabaseService } from '../../database/DatabaseService.js';
export class GameTriviaPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'game-trivia',
            category: 'mini-games',
            description: 'Juego de trivia con múltiples categorías',
            usage: 'game-trivia [opciones]',
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
            const triviaQuestions = [
                {
                    category: 'Anime',
                    question: '¿Cuál es el nombre real de Light Yagami en Death Note?',
                    options: ['Kira', 'L', 'Light', 'Ryuk'],
                    correct: 2
                },
                {
                    category: 'Gaming',
                    question: '¿En qué año se lanzó el primer Pokémon?',
                    options: ['1995', '1996', '1997', '1998'],
                    correct: 1
                },
                {
                    category: 'General',
                    question: '¿Cuál es el planeta más grande del sistema solar?',
                    options: ['Saturno', 'Júpiter', 'Neptuno', 'Urano'],
                    correct: 1
                }
            ];
            if (args[0] === 'start') {
                const question = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
                let questionText = `🧠 *Trivia - ${question.category}*\n\n❓ ${question.question}\n\n`;
                question.options.forEach((option, index) => {
                    questionText += `${index + 1}. ${option}\n`;
                });
                questionText += '\n⏰ Tienes 30 segundos para responder!';
                // Guardar pregunta activa
                await db.run('INSERT OR REPLACE INTO active_games (user_jid, game_type, game_data, expires_at) VALUES (?, ?, ?, ?)', [user.jid, 'trivia', JSON.stringify(question), Date.now() + 30000]);
                await reply(questionText);
            }
            else if (args[0] && !isNaN(args[0])) {
                const answer = parseInt(args[0]) - 1;
                const activeGame = await db.get('SELECT * FROM active_games WHERE user_jid = ? AND game_type = "trivia"', [user.jid]);
                if (!activeGame)
                    return await reply('❌ No tienes una pregunta activa');
                if (Date.now() > activeGame.expires_at)
                    return await reply('⏰ ¡Tiempo agotado!');
                const question = JSON.parse(activeGame.game_data);
                const isCorrect = answer === question.correct;
                await db.run('DELETE FROM active_games WHERE user_jid = ? AND game_type = "trivia"', [user.jid]);
                if (isCorrect) {
                    const reward = Math.floor(Math.random() * 50) + 25;
                    await this.updateUserRPG(user.jid, { gold: userProfile.gold + reward });
                    await reply(`🎉 *¡Correcto!*\n\n✅ Respuesta: ${question.options[question.correct]}\n💰 +${reward} oro`);
                }
                else {
                    await reply(`❌ *Incorrecto*\n\n✅ Respuesta correcta: ${question.options[question.correct]}`);
                }
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
    const plugin = new GameTriviaPlugin();
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
handler.command = ['game-trivia'];
export default handler;
//# sourceMappingURL=game-trivia.js.map