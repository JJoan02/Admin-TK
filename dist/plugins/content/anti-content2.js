export const antiArabPrefixes = [
    "212", "265", "234", "258", "263", "93", "967", "92", "234", "91", "254", "213"
];
export const antiArabePrefixes = [
    '91', '92', '222', '93', '265', '61', '62', '966', '229', '40', '49', '20', '963', '967', '234', '210', '212'
];
export const antiFakesPrefixes = [
    '6', '90', '212', '92', '93', '94', '7', '49', '2', '91', '48'
];
export const antiInternationalDefaultPrefixes = [
    '+6', '+9', '+7', '+4', '+2'
];
export const antiPrivadoConfig = {
    allowedCommands: [
        'piedra', 'papel', 'tijera', 'menu', 'estado', 'verificar', 'creadora', 'bottemporal',
        'grupos', 'instalarbot', 'términos', 'bots', 'deletebot', 'eliminarsesion', 'serbot',
        'verify', 'register', 'registrar', 'reg', 'reg1', 'nombre', 'name', 'nombre2',
        'name2', 'edad', 'age', 'edad2', 'age2', 'genero', 'género', 'gender', 'identidad',
        'pasatiempo', 'hobby', 'identify', 'finalizar', 'pas2', 'pas3', 'pas4', 'pas5',
        'registroC', 'deletesesion', 'registroR', 'jadibot'
    ],
    redirectMessage: (userMention) => `☁️ *Hola* ${userMention}, *no puede usar este bot en chat privado*\n\nUnete al Grupo oficial para poder usar el bot\nhttps://chat.whatsapp.com/GqKwwoV2JJaJDP2SL7SddX`,
    groupLink: 'https://chat.whatsapp.com/GqKwwoV2JJaJDP2SL7SddX'
};
export const antiPutosBlockedCodes = [
    '212', '7', '380', '966', '263', '91', '62', '20', '90', '48', '372', '994', '237', '92', '221',
];
export const antiSpamMessages = {
    level1: `᥀·࣭࣪̇˖⚔️◗ 𝙉𝙤 𝙝𝙖𝙜𝙖𝙨 𝙨𝙥𝙖𝙢.`,
    level2: `᥀·࣭࣪̇˖⚔️◗ 𝙉𝙤 𝙝𝙖𝙜𝙖𝙨 𝙨𝙥𝙖𝙢...`,
    level3: `᥀·࣭࣪̇˖👺◗ 𝙎𝙚𝙧𝙖𝙨 𝙚𝙡𝙞𝙢𝙞𝙣𝙖𝙙𝙤(𝙖) 𝙥𝙤𝙧 𝙝𝙖𝙘𝙚𝙧 𝙨𝙥𝙖𝙢.`,
    warning: (mention) => `🚩 _*Mucho Spam*__\n\n𝙐𝙨𝙪𝙖𝙧𝙞𝙤: ${mention}`
};
export const toxicWordsRegex = 'g0re|g0r3|g.o.r.e|sap0|sap4|malparido|malparida|malparidos|malparidas|m4lp4rid0|m4lp4rido|m4lparido|malp4rido|m4lparid0|malp4rid0|chocha|chup4la|chup4l4|chupalo|chup4lo|chup4l0|chupal0|chupon|chupameesta|sabandija|hijodelagranputa|hijodeputa|hijadeputa|hijadelagranputa|kbron|kbrona|cajetuda|laconchadedios|putita|putito|put1t4|putit4|putit0|put1to|put1ta|pr0stitut4s|pr0stitutas|pr05titutas|pr0stitut45|prostitut45|prostituta5|pr0stitut45|fanax|f4nax|drogas|droga|dr0g4|nepe|p3ne|p3n3|pen3|p.e.n.e|pvt0|pvto|put0|hijodelagransetentamilparesdeputa|Chingadamadre|coño|c0ño|coñ0|c0ñ0|afeminado|drog4|cocaína|marihuana|chocho|chocha|cagon|pedorro|agrandado|agrandada|pedorra|cagona|pinga|joto|sape|mamar|chigadamadre|hijueputa|chupa|caca|bobo|boba|loco|loca|chupapolla|estupido|estupida|estupidos|polla|pollas|idiota|maricon|chucha|verga|vrga|naco|zorra|zorro|zorras|zorros|pito|huevon|huevona|huevones|rctmre|mrd|ctm|csm|cepe|sepe|sepesito|cepecito|cepesito|hldv|ptm|baboso|babosa|babosos|babosas|feo|fea|feos|feas|mamawebos|chupame|bolas|qliao|imbecil|embeciles|kbrones|cabron|capullo|carajo|gore|gorre|gorreo|gordo|gorda|gordos|gordas|sapo|sapa|mierda|cerdo|cerda|puerco|puerca|perra|perro|dumb|fuck|shit|bullshit|cunt|semen|bitch|motherfucker|foker|fucking/i';
export const antiTrabasConfig = {
    MAX_MESSAGE_LENGTH: 4000,
    fakemek: { key: { participant: "0@s.whatsapp.net", "remoteJid": "0@s.whatsapp.net" }, "message": { "groupInviteMessage": { "groupJid": "51995386439-1616969743@g.us", "inviteCode": "m", "groupName": "P", "caption": 'Admin-TK', 'jpegThumbnail': null } } },
    messages: {
        adminWarning: (user) => `${global.lenguajeTK.smsAvisoAG()} ${global.AdminTK_mid.smsAntiTraba(user)}`,
        botNotAdmin: (listAdmin) => `${global.lenguajeTK.smsAvisoAG()}${global.AdminTK_mid.smsAntiTraba2}\n${listAdmin}\n\n${global.lenguajeTK.smsAllAdmin()}`,
        kickMessage: (name) => `${global.lenguajeTK.smsAvisoAG()}${global.AdminTK_mid.smsAntiTraba3}\n${"\n".repeat(400)}\n• ${global.AdminTK_mid.smsAntiTraba4(null, name)}`
    }
};
export const antiVerMessages = {
    description: (type, senderMention, caption) => `
✅️ *ANTI VER UNA VEZ* ✅️\n\n💭 *No ocultes* ${type === 'imageMessage' ? '`Imagen` 📷' : type === 'videoMessage' ? '`Vídeo` 🎥' : type === 'audioMessage' ? '`Mensaje de voz` 🎤' : 'este mensaje'}\n- ✨️ *Usuario:* ${senderMention}
${caption ? `- *Texto:* ${caption}` : ''}`
};
export const premiumMessages = {
    revoked: `「✐」Se agotó tu tiempo como usuario premium`
};
export const simiConfig = {
    ignoredKeywords: [
        'serbot', 'bots', 'jadibot', 'sockets', 'menu', 'update', 'play', 'play2', 'playdoc',
        'tiktok', 'facebook', 'menu2', 'infobot', 'estado', 'ping', 'sc', 'sticker', 's', 'wm', 'qc'
    ],
    errorMessage: '🍟 *Ocurrió un error al hablar con SimSimi.*'
};
//# sourceMappingURL=anti-content2.js.map