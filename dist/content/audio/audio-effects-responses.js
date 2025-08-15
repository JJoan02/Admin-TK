export const AUDIO_EFFECTS_NO_AUDIO_REPLY = (usedPrefix, command) => `> *𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙰 𝙰𝙻 𝙰𝚄𝙳𝙸𝙾 𝙾 𝙽𝙾𝚃𝙰 𝙳𝙴 𝚅𝙾𝚉 𝙴𝙻 𝙲𝚄𝙰𝙻 𝚂𝙴𝚁𝙰 𝙼𝙾𝙳𝙸𝙵𝙸𝙲𝙰𝙳𝙾, 𝚄𝚂𝙰𝙳𝙾 𝙴𝙻 𝙲𝙾𝙰𝙼𝙰𝙽𝙳𝙾 ${usedPrefix + command}*`;
export const AUDIO_EFFECTS_ERROR = "_*Error!*_ ";
export const AUDIO_EFFECTS_FILTERS = {
    bass: '-af equalizer=f=94:width_type=o:width=2:g=30',
    blown: '-af acrusher=.1:1:64:0:log',
    deep: '-af atempo=4/4,asetrate=44500*2/3',
    earrape: '-af volume=12',
    fast: '-filter:a "atempo=1.63,asetrate=44100"',
    fat: '-filter:a "atempo=1.6,asetrate=22100"',
    nightcore: '-filter:a atempo=1.06,asetrate=44100*1.25',
    reverse: '-filter_complex "areverse"',
    robot: '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"',
    slow: '-filter:a "atempo=0.7,asetrate=44100"',
    smooth: '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"',
    tupai: '-filter:a "atempo=0.5,asetrate=65100"',
    squirrel: '-filter:a "atempo=0.5,asetrate=65100"',
    chipmunk: '-filter:a "atempo=0.5,asetrate=65100"',
};
//# sourceMappingURL=audio-effects-responses.js.map