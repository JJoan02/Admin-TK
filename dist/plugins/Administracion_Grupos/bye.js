import { BYE_MESSAGE } from '../../content/administracion_grupos/bye-responses';
class ByePlugin {
    name = "ByePlugin";
    commands = [];
    async groupParticipantsUpdate(m, { conn, participants, isAdmin }) {
        const chat = global.db.data.chats[m.chat];
        if (!chat?.bye)
            return;
        const leftParticipants = participants.filter(p => p.action === 'remove').map(p => p.id);
        if (!leftParticipants.length)
            return;
        for (const user of leftParticipants) {
            const userName = await conn.getName(user);
            const groupName = (await conn.groupMetadata(m.chat)).subject;
            const byeMessage = BYE_MESSAGE(userName, groupName);
            await conn.sendMessage(m.chat, {
                text: byeMessage,
                mentions: [user]
            });
        }
    }
}
export default ByePlugin;
//# sourceMappingURL=bye.js.map