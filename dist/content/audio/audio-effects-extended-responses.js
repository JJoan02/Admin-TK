export const AUDIO_EFFECTS_EXTENDED_NO_AUDIO_REPLY = "🧑‍💻 RESPONDA AL AUDIO O NOTA DE VOZ 🎵*";
export const AUDIO_EFFECTS_EXTENDED_ERROR = "✖️";
export const AUDIO_EFFECTS_EXTENDED_FILTERS = {
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
    reverb: '-filter:a "aecho=0.8:0.9:1000:0.3"',
    chorus: '-filter:a "chorus=0.7:0.9:55:0.4:0.25:2"',
    flanger: '-filter:a "flanger=delay=20:depth=0.2"',
    distortion: '-filter:a "aecho=0.8:0.9:1000:0.3,firequalizer=gain_entry=\'entry(0,15)entry(250,0)entry(4000,15)\'"',
    pitch: '-filter:a "asetrate=44100*1.25,atempo=1.25"',
    highpass: '-filter:a "highpass=f=500"',
    lowpass: '-filter:a "lowpass=f=500"',
    underwater: '-af "asetrate=44100*0.5,atempo=2,lowpass=f=300"'
};
//# sourceMappingURL=audio-effects-extended-responses.js.map