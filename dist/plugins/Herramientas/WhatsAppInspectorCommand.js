import { Command } from '@core/Command.js';
import { getUrlFromDirectPath } from "@whiskeysockets/baileys";
import _ from "lodash";
import axios from 'axios';
import { whatsappInspectorMessages, formatDate, formatValue, newsletterKey, processObject } from '../../lib/herramientas-content.js';
class WhatsAppInspectorCommand extends Command {
    #logger;
    constructor(logger) {
        super('inspect', 'Obtiene información detallada de grupos, comunidades y canales de WhatsApp. Uso: !inspect <enlace>');
        this.#logger = logger;
        this.commands = ['superinspect', 'inspect', 'revisar', 'inspeccionar'];
    }
    async execute(context) {
        const { m, conn, text, args } = context;
        const channelUrlMatch = text?.match(/(?:https?:\/\/)?(?:www\.)?(?:chat\.|wa\.)?whatsapp\.com\/(?:channel\/|joinchat\/)?([0-9A-Za-z]{22,24})/i);
        const groupInviteUrlMatch = text?.match(/(?:https?:\/\/)?(?:www\.)?(?:chat\.|wa\.)?whatsapp\.com\/(?:invite\/|joinchat\/)?([0-9A-Za-z]{22,24})/i);
        let info = null;
        let pp = null;
        let inviteCode = null;
        try {
            if (!text) {
                await conn.reply(m.chat, whatsappInspectorMessages.noLink, m);
                return;
            }
            if (groupInviteUrlMatch) {
                const code = groupInviteUrlMatch[1];
                try {
                    const inviteInfo = await conn.groupGetInviteInfo(code);
                    info = this.#formatGroupInfo(inviteInfo, conn);
                    pp = await conn.profilePictureUrl(inviteInfo.id, 'image').catch(() => null);
                    inviteCode = code;
                }
                catch (e) {
                    this.#logger.error(`Error al obtener info de grupo por enlace: ${e.message}`);
                    await conn.reply(m.chat, whatsappInspectorMessages.groupNotFound, m);
                    return;
                }
            }
            else if (channelUrlMatch) {
                const code = channelUrlMatch[1];
                try {
                    const newsletterInfo = await conn.newsletterMetadata("invite", code).catch(e => { return null; });
                    if (!newsletterInfo) {
                        await conn.reply(m.chat, whatsappInspectorMessages.channelNotFound, m);
                        return;
                    }
                    info = whatsappInspectorMessages.channelInfo(newsletterInfo, processObject);
                    pp = newsletterInfo?.preview ? getUrlFromDirectPath(newsletterInfo.preview) : null;
                }
                catch (e) {
                    this.#logger.error(`Error al obtener info de canal por enlace: ${e.message}`);
                    await conn.reply(m.chat, whatsappInspectorMessages.channelNotFound, m);
                    return;
                }
            }
            else {
                try {
                    const groupMetadata = await conn.groupMetadata(m.chat);
                    info = this.#formatGroupInfo(groupMetadata, conn);
                    pp = await conn.profilePictureUrl(groupMetadata.id, 'image').catch(() => null);
                    inviteCode = await conn.groupInviteCode(m.chat).catch(() => null);
                }
                catch (e) {
                    this.#logger.error(`Error al obtener info del grupo actual: ${e.message}`);
                    await conn.reply(m.chat, whatsappInspectorMessages.noLink, m);
                    return;
                }
            }
            if (info) {
                await conn.sendMessage(m.chat, {
                    text: info,
                    contextInfo: {
                        mentionedJid: conn.parseMention(info),
                        externalAdReply: {
                            title: whatsappInspectorMessages.title,
                            body: global.packname,
                            thumbnailUrl: pp || global.gataMenu,
                            sourceUrl: args[0] || (inviteCode ? `https://chat.whatsapp.com/${inviteCode}` : global.md),
                            mediaType: 1,
                            showAdAttribution: false,
                            renderLargerThumbnail: false
                        }
                    }
                }, { quoted: m });
            }
            else {
                await conn.reply(m.chat, whatsappInspectorMessages.noLink, m);
            }
        }
        catch (e) {
            this.#logger.error(`Error general en WhatsAppInspectorCommand: ${e.message}`);
            await conn.reply(m.chat, `Ocurrió un error al inspeccionar.`, m);
        }
    }
    #formatGroupInfo(res, conn) {
        let nameCommunity = "no pertenece a ninguna Comunidad";
        if (res.linkedParent) {
            nameCommunity = `\n\n*Nombre:* ${res.linkedParentSubject || ""}`;
        }
        const formatParticipants = (participants) => participants && participants.length > 0
            ? participants.map((user, i) => `${i + 1}. @${user.id?.split("@")[0]}${user.admin === "superadmin" ? " (superadmin)" : user.admin === "admin" ? " (admin)" : ""}`).join("\n")
            : "No encontrado";
        return `🆔 *Identificador del grupo:*\n${res.id || "No encontrado"}\n\n` +
            `👑 *Creado por:*\n${res.owner ? `@${res.owner?.split("@")[0]}` : "No encontrado"} ${res.creation ? `el ${formatDate(res.creation)}` : "(Fecha no encontrada)"}\n\n` +
            `🏷️ *Nombre:*\n${res.subject || "No encontrado"}\n\n` +
            `✏️ *Nombre cambiado por:*\n${res.subjectOwner ? `@${res.subjectOwner?.split("@")[0]}` : "No encontrado"} ${res.subjectTime ? `el ${formatDate(res.subjectTime)}` : "(Fecha no encontrada)"}\n\n` +
            `📄 *Descripción:*\n${res.desc || "No encontrado"}\n\n` +
            `📝 *Descripción cambiado por:*\n${res.descOwner ? `@${res.descOwner?.split("@")[0]}` : "No encontrado"}\n\n` +
            `🗃️ *Id de la descripción:*\n${res.descId || "No encontrado"}\n\n` +
            `🖼️ *Imagen del grupo:*\n${pp ? pp : "No se pudo obtener"}\n\n` +
            `💫 *Autor:*\n${res.author || "No encontrado"}\n\n` +
            `🎫 *Código de invitación:*\n${res.inviteCode || inviteCode || "No disponible"}\n\n` +
            `⌛ *Duración:*\n${res.ephemeralDuration !== undefined ? `${res.ephemeralDuration} segundos` : "Desconocido"}\n\n` +
            `🛃 *Admins:*\n` + (res.participants && res.participants.length > 0 ? res.participants.filter(user => user.admin === "admin" || user.admin === "superadmin").map((user, i) => `${i + 1}. @${user.id?.split("@")[0]}${user.admin === "superadmin" ? " (superadmin)" : user.admin === "admin" ? " (admin)" : ""}`).join("\n") : "No encontrado") + `\n\n` +
            `🔰 *Usuarios en total:*\n${res.size || "Cantidad no encontrada"}\n\n` +
            `✨ *Información avanzada* ✨\n\n🔎 *Comunidad vinculada al grupo:*\n${res.isCommunity ? "Este grupo es un chat de avisos" : `${res.linkedParent ? "`Id:` " + res.linkedParent : "Este grupo"} ${nameCommunity}`}\n\n` +
            `⚠️ *Restricciones:* ${res.restrict ? "✅" : "❌"}\n` +
            `📢 *Anuncios:* ${res.announce ? "✅" : "❌"}\n` +
            `🏘️ *¿Es comunidad?:* ${res.isCommunity ? "✅" : "❌"}\n` +
            `📯 *¿Es anuncio de comunidad?:* ${res.isCommunityAnnounce ? "✅" : "❌"}\n` +
            `🤝 *Tiene aprobación de miembros:* ${res.joinApprovalMode ? "✅" : "❌"}\n` +
            `🆕 *Puede Agregar futuros miembros:* ${res.memberAddMode ? "✅" : "❌"}\n\n`;
    }
}
export default WhatsAppInspectorCommand;
//# sourceMappingURL=WhatsAppInspectorCommand.js.map