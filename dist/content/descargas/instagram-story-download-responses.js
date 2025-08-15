export const INSTAGRAM_STORY_NO_USERNAME = (smsAvisoMG, smsInsta2, usedPrefix, command) => `${smsAvisoMG}${smsInsta2}
*${usedPrefix + command} gata_dios*`;
export const INSTAGRAM_STORY_NO_RESULTS = (smsAvisoFG, smsInsta3) => `${smsAvisoFG}${smsInsta3}`;
export const INSTAGRAM_STORY_API_ERROR = (smsMalError3, smsMensError2, usedPrefix, command, wm) => `${smsMalError3}#report ${smsMensError2} ${usedPrefix + command}

${wm}`;
export const INSTAGRAM_STORY_INFO_MESSAGE = (smsAvisoIIG, smsinfo) => `${smsAvisoIIG}${smsinfo}`;
//# sourceMappingURL=instagram-story-download-responses.js.map