export const audioEffectMessages = {
    noAudio: (usedPrefix, command) => `${global.lenguajeTK.smsAvisoMG()}${global.mid.smsconvert16} *${usedPrefix + command}*`,
    error: '*_Error!_*',
    processing: 'Aplicando efecto de audio...',
    success: 'Efecto de audio aplicado con éxito.'
};
//# sourceMappingURL=audio-content.js.map