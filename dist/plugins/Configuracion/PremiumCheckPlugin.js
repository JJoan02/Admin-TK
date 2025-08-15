import { premiumMessages } from '../../lib/anti-content.js';
class PremiumCheckPlugin {
    #dbService;
    #logger;
    constructor(dbService, logger) {
        this.#dbService = dbService;
        this.#logger = logger;
    }
    async all(m, chatUpdate, conn) {
        try {
            const allUsers = await this.#dbService.getAllUsers();
            for (const userJid in allUsers) {
                const user = allUsers[userJid];
                if (user.premiumTime && user.premiumTime !== 0 && user.premium) {
                    if (new Date().getTime() >= user.premiumTime) {
                        await this.#dbService.updateUser(userJid, { premiumTime: 0, premium: false });
                        const textoo = premiumMessages.revoked;
                        await conn.sendMessage(userJid, { text: textoo, mentions: [userJid] }, { quoted: global.fkontak });
                        this.#logger.info(`Premium revocado para ${userJid}`);
                    }
                }
            }
        }
        catch (e) {
            this.#logger.error(`Error en PremiumCheckPlugin: ${e.message}`);
        }
        return true;
    }
}
export default PremiumCheckPlugin;
//# sourceMappingURL=PremiumCheckPlugin.js.map