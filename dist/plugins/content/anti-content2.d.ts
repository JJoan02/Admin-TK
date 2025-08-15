export const antiArabPrefixes: string[];
export const antiArabePrefixes: string[];
export const antiFakesPrefixes: string[];
export const antiInternationalDefaultPrefixes: string[];
export namespace antiPrivadoConfig {
    let allowedCommands: string[];
    function redirectMessage(userMention: any): string;
    let groupLink: string;
}
export const antiPutosBlockedCodes: string[];
export namespace antiSpamMessages {
    let level1: string;
    let level2: string;
    let level3: string;
    function warning(mention: any): string;
}
export const toxicWordsRegex: "g0re|g0r3|g.o.r.e|sap0|sap4|malparido|malparida|malparidos|malparidas|m4lp4rid0|m4lp4rido|m4lparido|malp4rido|m4lparid0|malp4rid0|chocha|chup4la|chup4l4|chupalo|chup4lo|chup4l0|chupal0|chupon|chupameesta|sabandija|hijodelagranputa|hijodeputa|hijadeputa|hijadelagranputa|kbron|kbrona|cajetuda|laconchadedios|putita|putito|put1t4|putit4|putit0|put1to|put1ta|pr0stitut4s|pr0stitutas|pr05titutas|pr0stitut45|prostitut45|prostituta5|pr0stitut45|fanax|f4nax|drogas|droga|dr0g4|nepe|p3ne|p3n3|pen3|p.e.n.e|pvt0|pvto|put0|hijodelagransetentamilparesdeputa|Chingadamadre|co\u00F1o|c0\u00F1o|co\u00F10|c0\u00F10|afeminado|drog4|coca\u00EDna|marihuana|chocho|chocha|cagon|pedorro|agrandado|agrandada|pedorra|cagona|pinga|joto|sape|mamar|chigadamadre|hijueputa|chupa|caca|bobo|boba|loco|loca|chupapolla|estupido|estupida|estupidos|polla|pollas|idiota|maricon|chucha|verga|vrga|naco|zorra|zorro|zorras|zorros|pito|huevon|huevona|huevones|rctmre|mrd|ctm|csm|cepe|sepe|sepesito|cepecito|cepesito|hldv|ptm|baboso|babosa|babosos|babosas|feo|fea|feos|feas|mamawebos|chupame|bolas|qliao|imbecil|embeciles|kbrones|cabron|capullo|carajo|gore|gorre|gorreo|gordo|gorda|gordos|gordas|sapo|sapa|mierda|cerdo|cerda|puerco|puerca|perra|perro|dumb|fuck|shit|bullshit|cunt|semen|bitch|motherfucker|foker|fucking/i";
export namespace antiTrabasConfig {
    let MAX_MESSAGE_LENGTH: number;
    namespace fakemek {
        namespace key {
            let participant: string;
            let remoteJid: string;
        }
        namespace message {
            namespace groupInviteMessage {
                let groupJid: string;
                let inviteCode: string;
                let groupName: string;
                let caption: string;
                let jpegThumbnail: null;
            }
        }
    }
    namespace messages {
        function adminWarning(user: any): string;
        function botNotAdmin(listAdmin: any): string;
        function kickMessage(name: any): string;
    }
}
export namespace antiVerMessages {
    function description(type: any, senderMention: any, caption: any): string;
}
export namespace premiumMessages {
    let revoked: string;
}
export namespace simiConfig {
    let ignoredKeywords: string[];
    let errorMessage: string;
}
//# sourceMappingURL=anti-content2.d.ts.map