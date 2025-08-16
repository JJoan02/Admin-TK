// src/commandHandlers/DemoteCommandHandler.js
import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();
import DataUtils from '../utils/dataUtils.js';
export class DemoteCommandHandler {
    async handle(command) {
        const { context } = command;
        const { sock, chat, reply, message, config } = context;
        const groupMetadata = await sock.groupMetadata(chat.id);
        const botIsAdmin = groupMetadata.participants.some(p => DataUtils.normalizeJid(p.id) === DataUtils.normalizeJid(sock.user.id) && p.admin);
        if (!botIsAdmin) {
            return reply('❌ Necesito ser administrador en este grupo para poder degradar a otros.');
        }
        const mentionedJids = message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
        if (mentionedJids.length === 0) {
            return reply('⚠️ Debes mencionar a al menos un administrador para degradarlo.');
        }
        const membersToDemote = [];
        for (const jid of mentionedJids) {
            const target = groupMetadata.participants.find(p => DataUtils.normalizeJid(p.id) === DataUtils.normalizeJid(jid));
            if (!target?.admin) {
                reply(`⚠️ El usuario ${DataUtils.getPhoneNumberFromJid(jid)} no es administrador.`);
                continue;
            }
            if (DataUtils.normalizeJid(jid) === DataUtils.normalizeJid(config.botNumber)) {
                reply('❌ No puedo degradarme a mí mismo.');
                continue;
            }
            // Esta comprobación de rol es una aproximación. El rol del usuario no está en groupMetadata.
            // Se necesitaría una consulta al UserManager para una verificación precisa.
            // if (Auth.isOwner(target.role)) { 
            //   reply('❌ No puedes degradar a un dueño del bot.');
            //   continue;
            // }
            membersToDemote.push(jid);
        }
        if (membersToDemote.length === 0) {
            return;
        }
        try {
            const result = await sock.groupParticipantsUpdate(chat.id, membersToDemote, 'demote');
            const { success, failed } = this.processGroupUpdateResult(result);
            let responseText = '';
            if (success.length > 0)
                responseText += `✅ Se degradó a: ${success.join(', ')}
`;
            if (failed.length > 0)
                responseText += `❌ Falló al degradar a: ${failed.join(', ')}
`;
            reply(responseText.trim());
        }
        catch (error) {
            logger.error({ err: error }, '❌ Error al intentar degradar participantes.');
            reply('❌ Ocurrió un error inesperado al degradar miembros.');
        }
    }
    processGroupUpdateResult(result) {
        const success = [];
        const failed = [];
        for (const res of result) {
            const jid = DataUtils.getPhoneNumberFromJid(res.jid);
            if (res.status.toString().startsWith('2')) {
                success.push(jid);
            }
            else {
                failed.push(jid);
            }
        }
        return { success, failed };
    }
}
export default DemoteCommandHandler;
//# sourceMappingURL=DemoteCommandHandler.js.map