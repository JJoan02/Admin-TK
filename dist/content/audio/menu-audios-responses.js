export const MENU_AUDIOS_LIST_MESSAGE_TEXT = "Selecciona un audio de la lista:";
export const MENU_AUDIOS_LIST_MESSAGE_FOOTER = "© Admin-TK";
export const MENU_AUDIOS_LIST_MESSAGE_TITLE = "🎧 Menú de Audios";
export const MENU_AUDIOS_LIST_MESSAGE_BUTTON_TEXT = "Ver Audios";
export const MENU_AUDIOS_SECTIONS = [
    {
        title: "Efectos de Voz",
        rows: [
            { title: "Bass Boost", rowId: ".bass" },
            { title: "Blown", rowId: ".blown" },
            { title: "Deep", rowId: ".deep" },
            { title: "Earrape", rowId: ".earrape" },
            { title: "Fast", rowId: ".fast" },
            { title: "Fat", rowId: ".fat" },
            { title: "Nightcore", rowId: ".nightcore" },
            { title: "Reverse", rowId: ".reverse" },
            { title: "Robot", rowId: ".robot" },
            { title: "Slow", rowId: ".slow" },
            { title: "Smooth", rowId: ".smooth" },
            { title: "Chipmunk", rowId: ".chipmunk" },
        ]
    },
    {
        title: "Audios Bot",
        rows: [
            { title: "Audio 1", rowId: ".audio1" },
            { title: "Audio 2", rowId: ".audio2" },
        ]
    }
];
export const MENU_AUDIOS_ERROR_MESSAGE = (smsMalError3, smsMensError1, smsMensError2, usedPrefix, command) => `
${smsMalError3}: ${smsMensError1}
${smsMensError2}: ${usedPrefix}reporte ${command}
`;
//# sourceMappingURL=menu-audios-responses.js.map