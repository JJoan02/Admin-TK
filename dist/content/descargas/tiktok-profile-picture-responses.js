export const TIKTOK_PP_NO_USERNAME = (smsAvisoMG, TikTok, usedPrefix, command) => `${smsAvisoMG}${TikTok}\n*${usedPrefix + command} Gata_Dios*`;
export const TIKTOK_PP_SUCCESS = (TikTok1, username) => `✅ ${TikTok1}\n💟 *${username}*`;
export const TIKTOK_PP_INFO_MESSAGE = (smsAvisoIIG, smsinfo) => `${smsAvisoIIG} *${smsinfo}*`;
export const TIKTOK_PP_ERROR_REPORT = (smsMalError3, smsMensError2, usedPrefix, command, wm) => `${smsMalError3}#report ${smsMensError2} ${usedPrefix + command}\n\n${wm}`;
//# sourceMappingURL=tiktok-profile-picture-responses.js.map