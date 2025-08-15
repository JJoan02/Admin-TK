import chalk from 'chalk';
import { WAMessageStubType } from '@whiskeysockets/baileys';
import { promises as fs } from 'fs';
import path from 'path';
import { GATAMENU_URL } from '../../../config/redes_sociales/socialMediaConfig';
class AutodetectarPlugin {
    async before(m, { conn, participants, groupMetadata, isBotAdmin }) {
        if (!m.messageStubType || !m.isGroup)
            return;
        let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch((_) => GATAMENU_URL);
        let img = await (await fetch(`${pp}`)).buffer();
        let usuario = `@${m.sender.split('@')[0]}`;
        let chat = global.db.data.chats[m.chat];
        const groupAdmins = participants.filter((p) => p.admin);
        if (chat.detect) {
            switch (m.messageStubType) {
                case WAMessageStubType.GROUP_CHANGE_SUBJECT:
                    const uniqid = (m.isGroup ? m.chat : m.sender).split('@')[0];
                    const sessionPath = './GataBotSession/';
                    try {
                        for (const file of await fs.readdir(sessionPath)) {
                            if (file.includes(uniqid)) {
                                await fs.unlink(path.join(sessionPath, file));
                                console.log(`${chalk.yellow.bold('[ ⚠️ Archivo Eliminado ]')} ${chalk.greenBright("'" + file + "'")}\n" +
                                    `, $, { chalk, : .blue('(Session PreKey)') }, $, { chalk, : .redBright('que provoca el "undefined" en el chat') } `);
                            }
                        }
                    } catch (err) {
                        console.error(AUTODETECT_ERROR_READING_SESSION_FOLDER, err);
                    }
                    // Also handle group name change message from _autodetect.js
                    await conn.sendMessage(m.chat, { text: AUTODETECT_GROUP_NAME_CHANGED(usuario, m.messageStubParameters[0]), mentions: [m.sender] }, { quoted: global.fkontak });
                    break;

                case WAMessageStubType.GROUP_PARTICIPANT_ADD: // 21
                    await conn.sendMessage(m.chat, { text: global.lenguajeGB['smsAvisoAG']() + global.mid.smsAutodetec1(usuario, m), mentions: [m.sender, ...groupAdmins.map((v: any) => v.id)] }, { quoted: global.fkontak });
                    break;

                case WAMessageStubType.GROUP_CHANGE_PHOTO: // 22
                    await conn.sendMessage(m.chat, { image: { url: pp }, caption: AUTODETECT_GROUP_PHOTO_CHANGED(usuario), mentions: [m.sender] }, { quoted: global.fkontak });
                    break;

                case WAMessageStubType.GROUP_CHANGE_INVITE_LINK: // 24 (Corrected from 23 in _autodetect.js)
                    await conn.sendMessage(m.chat, { text: AUTODETECT_GROUP_LINK_RESET(usuario), mentions: [m.sender] }, { quoted: global.fkontak });
                    break;

                case WAMessageStubType.GROUP_PARTICIPANT_DEMOTE: // 24 (Corrected from 25 in _autodetect.js)
                    await conn.sendMessage(m.chat, { text: global.lenguajeGB['smsAvisoIIG']() + global.mid.smsAutodetec3(usuario, m), mentions: [m.sender] }, { quoted: global.fkontak });
                    break;

                case WAMessageStubType.GROUP_CHANGE_ANNOUNCE: // 25 (Corrected from 26 in _autodetect.js)
                    await conn.sendMessage(m.chat, { text: AUTODETECT_GROUP_SETTINGS_CHANGED(usuario, m.messageStubParameters[0]), mentions: [m.sender] }, { quoted: global.fkontak });
                    break;

                case WAMessageStubType.GROUP_CHANGE_RESTRICT: // 26 (Corrected from 25 in _autodetect.js)
                    await conn.sendMessage(m.chat, { text: AUTODETECT_GROUP_STATUS_CHANGED(usuario, m.messageStubParameters[0]), mentions: [m.sender] }, { quoted: global.fkontak });
                    break;

                case WAMessageStubType.GROUP_PARTICIPANT_CHANGE_ADMIN: // 29
                    await conn.sendMessage(m.chat, { text: AUTODETECT_ADMIN_PROMOTED(m.messageStubParameters[0].split('@')[0], usuario), mentions: [m.sender, m.messageStubParameters[0]] }, { quoted: global.fkontak });
                    break;

                case WAMessageStubType.GROUP_PARTICIPANT_CHANGE_OWNER: // 30
                    await conn.sendMessage(m.chat, { text: AUTODETECT_ADMIN_DEMOTED(m.messageStubParameters[0].split('@')[0], usuario), mentions: [m.sender, m.messageStubParameters[0]] }, { quoted: global.fkontak });
                    break;

                case WAMessageStubType.GROUP_CHANGE_DESCRIPTION: // 72
                    await conn.sendMessage(m.chat, { text: global.lenguajeGB['smsAvisoIIG']() + global.mid.smsAutodetec9(usuario, m), mentions: [m.sender] }, { quoted: global.fkontak });
                    break;

                case WAMessageStubType.GROUP_PARTICIPANT_INVITE: // 172
                    const rawUser = m.messageStubParameters[0];
                    const users = rawUser.split('@')[0];
                    const prefijosProhibidos = AUTODETECT_FORBIDDEN_PREFIXES;
                    const usersConPrefijo = users.startsWith('+') ? users : ` + $, { users } `;

                    if (chat.antifake && isBotAdmin) {
                        if (prefijosProhibidos.some(prefijo => usersConPrefijo.startsWith(prefijo))) {
                            try {
                                await conn.groupRequestParticipantsUpdate(m.chat, [rawUser], 'reject');
                                console.log(AUTODETECT_REQUEST_REJECTED(usersConPrefijo));
                            } catch (error) {
                                console.error(AUTODETECT_ERROR_REJECTING_REQUEST(usersConPrefijo), error);
                            }
                        } else {
                            try {
                                await conn.groupRequestParticipantsUpdate(m.chat, [rawUser], 'approve');
                                console.log(AUTODETECT_REQUEST_APPROVED(usersConPrefijo));
                            } catch (error) {
                                console.error(AUTODETECT_ERROR_APPROVING_REQUEST(usersConPrefijo), error);
                            }
                        }
                    } else {
                        try {
                            await conn.groupRequestParticipantsUpdate(m.chat, [rawUser], 'approve');
                            console.log(AUTODETECT_REQUEST_APPROVED_NO_ANTIFAKE(usersConPrefijo));
                        } catch (error) {
                            console.error(AUTODETECT_ERROR_APPROVING_REQUEST(usersConPrefijo), error);
                        }
                    }
                    break;

                case WAMessageStubType.GROUP_CHANGE_PRIVACY: // 123
                    await conn.sendMessage(m.chat, { text: global.mid.smsAutodetec10(usuario, m), mentions: [m.sender] }, { quoted: global.fkontak });
                    break;

                default:
                    // Log other messageStubTypes for debugging if needed
                    console.log({
                        messageStubType: m.messageStubType,
                        messageStubParameters: m.messageStubParameters,
                        type: WAMessageStubType[m.messageStubType],
                    });
                    break;
            }
        }

        // Welcome/Goodbye messages are handled separately as they don't depend on chat.detect
        if (chat.welcome) {
            if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD && conn.user.jid !== global.conn.user.jid) { // messageStubType == 27
                let subject = groupMetadata.subject;
                let descs = groupMetadata.desc || AUTODETECT_WELCOME_DEFAULT_DESC;
                let userName = `, $, { m, : .messageStubParameters[0].split('@')[0] } `;
                let defaultWelcome = AUTODETECT_WELCOME_DEFAULT_MESSAGE(subject, userName, descs);
                let textWel = chat.sWelcome ? chat.sWelcome
                    .replace(/@user/g, `, , { userName } `)
                    .replace(/@group/g, subject)
                    .replace(/@desc/g, descs)
                    : defaultWelcome;

                await conn.sendMessage(m.chat, {
                    text: textWel,
                    contextInfo: {
                        forwardingScore: 9999999,
                        isForwarded: true,
                        mentionedJid: [m.sender, m.messageStubParameters[0]],
                        externalAdReply: {
                            showAdAttribution: true,
                            renderLargerThumbnail: true,
                            thumbnailUrl: pp,
                            title: [WM_URL, '😻 𝗦𝘂𝗽𝗲𝗿 ' + GT_URL + ' 😻', '🌟 centergatabot.gmail.com'].getRandom(), // Using external URLs
                            containsAutoReply: true,
                            mediaType: 1,
                            sourceUrl: [CANAL1_URL, CANAL2_URL, CANAL3_URL, CANAL4_URL, YT_URL, GRUPO1_URL, GRUPO2_URL, GRUPO_COLLAB1_URL, GRUPO_COLLAB2_URL, GRUPO_COLLAB3_URL, MD_URL].getRandom() // Using external URLs
                        }
                    }
                }, { quoted: global.fkontak });
            } else if ((m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) && conn.user.jid !== global.conn.user.jid) { // messageStubType == 28 || 32
                let subject = groupMetadata.subject;
                let userName = `, $, { m, : .messageStubParameters[0].split('@')[0] } `;
                let defaultBye = AUTODETECT_GOODBYE_DEFAULT_MESSAGE(userName);
                let textBye = chat.sBye ? chat.sBye
                    .replace(/@user/g, `, , { userName } `)
                    .replace(/@group/g, subject)
                    : defaultBye;
                await conn.sendMessage(m.chat, {
                    text: textBye,
                    contextInfo: {
                        forwardingScore: 9999999,
                        isForwarded: true,
                        mentionedJid: [m.sender, m.messageStubParameters[0]],
                        externalAdReply: {
                            showAdAttribution: true,
                            renderLargerThumbnail: true,
                            thumbnailUrl: pp,
                            title: [WM_URL, '😻 𝗦𝘂𝗽𝗲𝗿 ' + GT_URL + ' 😻', '🌟 centergatabot.gmail.com'].getRandom(), // Using external URLs
                            containsAutoReply: true,
                            mediaType: 1,
                            sourceUrl: [CANAL1_URL, CANAL2_URL, CANAL3_URL, CANAL4_URL, YT_URL, GRUPO1_URL, GRUPO2_URL, GRUPO_COLLAB1_URL, GRUPO_COLLAB2_URL, GRUPO_COLLAB3_URL, MD_URL].getRandom() // Using external URLs
                        }
                    }
                }, { quoted: global.fkontak });
            }
        }
    }
}

export default new AutodetectarPlugin(););
                            }
                        }
                    }
                    finally { }
            }
        }
    }
}
//# sourceMappingURL=autodetectar_plugin.js.map