class ModoAdminPlugin {
    name = "ModoAdminPlugin";
    commands = [];
    async before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner, isPrems }) {
        const chat = global.db.data.chats[m.chat];
        const bot = global.db.data.settings[conn.user.jid] || {};
        const adminMode = chat?.modoadmin;
        if (m.isGroup) {
            if (adminMode && !isOwner && !isROwner && !isAdmin) {
                return false;
            }
            if (!isBotAdmin) {
                return false;
            }
        }
        else {
            if (isOwner || isROwner || isPrems) {
                return true;
            }
            return false;
        }
        return true;
    }
}
export default ModoAdminPlugin;
//# sourceMappingURL=_modoAdmin.js.map