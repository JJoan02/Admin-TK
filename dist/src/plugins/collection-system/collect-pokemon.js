// collect-pokemon.ts - Sistema de colección avanzado
// Categoría: collection-system
// Funcionalidad: Captura de Pokémon con imágenes y estadísticas
// Sistema tipo Pokémon con imágenes y rareza
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
import { DatabaseService } from '../../database/DatabaseService.js';
export class CollectPokemonPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'collect-pokemon',
            category: 'collection-system',
            description: 'Captura de Pokémon con imágenes y estadísticas',
            usage: 'collect-pokemon [opciones]',
            aliases: [],
            permissions: ['user'],
            cooldown: 10000,
            collectionRequired: true
        });
    }
    async execute(context) {
        const { message, args, reply, conn, user } = context;
        const db = DatabaseService.getInstance();
        const api = InternalAPIService.getInstance();
        try {
            // Verificar colección del usuario
            const userCollection = await this.getUserCollection(user.jid);
            const pokemonList = [
                { id: 1, name: 'Pikachu', type: 'Electric', rarity: 'uncommon', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
                { id: 2, name: 'Charizard', type: 'Fire/Flying', rarity: 'rare', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png' },
                { id: 3, name: 'Mewtwo', type: 'Psychic', rarity: 'legendary', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png' }
            ];
            if (args[0] === 'catch') {
                const randomPokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)];
                const catchChance = Math.random();
                const rarityChances = { common: 0.8, uncommon: 0.6, rare: 0.4, epic: 0.2, legendary: 0.1 };
                if (catchChance <= rarityChances[randomPokemon.rarity]) {
                    await this.addToCollection(user.jid, {
                        type: 'pokemon',
                        id: randomPokemon.id,
                        rarity: randomPokemon.rarity
                    });
                    await conn.sendMessage(message.chat, {
                        image: { url: randomPokemon.image },
                        caption: `🎉 *¡Captura exitosa!*\n\n${this.getRarityEmoji(randomPokemon.rarity)} *${randomPokemon.name}*\n🏷️ Tipo: ${randomPokemon.type}\n⭐ Rareza: ${randomPokemon.rarity}`
                    }, { quoted: message });
                }
                else {
                    await reply(`💨 *¡${randomPokemon.name} escapó!*\n\nIntenta de nuevo en unos minutos.`);
                }
            }
            else {
                // Mostrar colección
                const collection = await this.getUserCollection(user.jid);
                const pokemonCount = collection.filter(item => item.item_type === 'pokemon').length;
                await reply(`📱 *Tu Pokédex*\n\n🎯 Pokémon capturados: ${pokemonCount}\n\nUsa *collect-pokemon catch* para capturar más!`);
            }
        }
        catch (error) {
            console.error(`Error en ${this.name}:`, error);
            await reply('❌ Error en el sistema de colección. Intenta de nuevo.');
        }
    }
    async getUserCollection(userJid) {
        const db = DatabaseService.getInstance();
        return await db.all('SELECT * FROM user_collections WHERE jid = ?', [userJid]);
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
}
// Exportar para compatibilidad
const handler = async (m, { conn, args, usedPrefix, command }) => {
    const plugin = new CollectPokemonPlugin();
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
handler.command = ['collect-pokemon'];
export default handler;
//# sourceMappingURL=collect-pokemon.js.map