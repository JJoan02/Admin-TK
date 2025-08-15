export const marryMessages = {
    alreadyMarried: (partnerName) => `《✧》 Ya estás casado con *${partnerName}*\n> Puedes divorciarte con el comando: *#divorce*`,
    mentionRequired: 'Debes mencionar a alguien para aceptar o proponer matrimonio.\n> Ejemplo » *#marry @⁨Yuki Suou.⁩*',
    proposerAlreadyMarried: (partnerName) => `Ya estás casado con ${partnerName}`,
    proposeeAlreadyMarried: (proposeeName, partnerName) => `${proposeeName} ya está casado con ${partnerName}`,
    selfPropose: '¡No puedes proponerte matrimonio a ti mismo!',
    proposal: (proposerName, proposeeName) => `♡ ${proposerName} te ha propuesto matrimonio. ${proposeeName}  ¿aceptas? •(=^●ω●^=)•\n\n*Debes Responder con:*\n> ✐"Si" » para aceptar\n> ✐"No" » para rechazar.`,
    proposalTimeout: '*《✧》Se acabó el tiempo, no se obtuvo respuesta. La propuesta de matrimonio fue cancelada.*',
    notMarried: 'No estás casado con nadie.',
    divorceSuccess: (user1Name, user2Name) => `✐ ${user1Name} y ${user2Name} se han divorciado.`,
    proposalRejected: '*《✧》Han rechazado tu propuesta de matrimonio.*',
    marriageSuccess: (proposerName, proposeeName) => `✩.･:｡≻───── ⋆♡⋆ ─────.•:｡✩\n¡Se han Casado! ฅ^•ﻌ•^ฅ*:･ﾟ✧\n\n*•.¸♡ Esposo ${proposerName}\n*•.¸♡ Esposa ${proposeeName}\n\n\`Disfruten de su luna de miel\`\n\n✩.･:｡≻───── ⋆♡⋆ ─────.•:｡✩`,
    genericError: (message) => `《✧》 ${message}`
};
//# sourceMappingURL=diversion-content.js.map