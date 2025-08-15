export const RANK_ROLES = [
    { level: 2, name: 'Principiante' },
    { level: 4, name: 'Demonio' },
    { level: 6, name: 'Diablillo' },
    { level: 8, name: 'Abominación' },
    { level: 10, name: 'Demoniaco' },
    { level: 12, name: 'Archidemonio' },
    { level: 14, name: 'Señor Infernal' },
    { level: 16, name: 'Rey Demonio' },
    { level: 18, name: 'Emperador Demonio' },
    { level: 20, name: 'Señor Oscuro' },
    { level: 22, name: 'Emperador de las Sombras' },
    { level: 24, name: 'Emperador del Fuego Infernal' },
    { level: 26, name: 'Señor Supremo Demonio' },
    { level: 28, name: 'Rey Diablo' },
    { level: 30, name: 'Emperador del Inframundo' },
    { level: 32, name: 'Príncipe de la Oscuridad' },
    { level: 34, name: 'Señor del Inframundo' },
    { level: 36, name: 'Señor Demonio Supremo' },
    { level: 38, name: 'Maestro del Infierno' },
    { level: 40, name: 'Emperador de los Reinos Oscuros' },
    { level: 42, name: 'Señor de las Llamas' },
    { level: 44, name: 'Señor de las Sombras' },
    { level: 46, name: 'Emperador Diablo' },
    { level: 48, name: 'General Demonio' },
    { level: 50, name: 'Rey Diablo Supremo' },
    { level: 52, name: 'Señor del Infierno' },
    { level: 54, name: 'Señor de la Guerra Demonio' },
    { level: 56, name: 'Supremo' },
    { level: 58, name: 'Emperador' },
    { level: 60, name: 'Yaksa' },
    { level: 62, name: 'Vampiro Antiguo' },
    { level: 64, name: 'Rey del Fuego Infernal' },
    { level: 66, name: 'Señor Demonio Supremo' },
    { level: 68, name: 'Gobernante Venerado' },
    { level: 70, name: 'Gobernante Divino' },
    { level: 72, name: 'Gobernante Eterno' },
    { level: 74, name: 'Prime' },
    { level: 76, name: 'Señor Prime' },
    { level: 78, name: 'El Emperador Prime' },
    { level: 80, name: 'El Original' },
    { level: 100, name: 'Perra de Alto Nivel' },
];
export const RANK_XP_MESSAGE = (pushName, disc, xp, nextLevelXp, level, role) => {
    return `*${pushName}#${disc}* Exp

` +
        `*🎯️ XP*: ${xp} / ${nextLevelXp}
` +
        `*❤️ Nivel*: ${level}
` +
        `*🔮️ Rol*: ${role}`;
};
export const DEFAULT_PROFILE_PICTURE_URL = 'https://www.linkpicture.com/q/IMG-20220118-WA0387.png';
export const RANK_ERROR_MESSAGE = "Ocurrió un error al generar la tarjeta de rango.";
//# sourceMappingURL=rango-responses.js.map