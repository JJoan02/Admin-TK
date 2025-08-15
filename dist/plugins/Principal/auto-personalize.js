import fs from 'fs';
const filePath = './database/personalize.json';
const defaultData = {
    default: {
        botName: "Alya Mikhailovna Kujou",
        currency: "yenes",
        videos: [
            "https://files.catbox.moe/b5n81s.mp4",
            "https://files.catbox.moe/o9vzpe.mp4",
            "https://files.catbox.moe/4qg0nz.mp4"
        ]
    },
    global: {
        botName: null,
        currency: null,
        videos: []
    }
};
let handler = async () => {
    try {
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
            console.log('✅ Archivo personalize.json creado exitosamente.');
        }
        else {
            const currentData = JSON.parse(fs.readFileSync(filePath));
            if (!currentData.default || !currentData.global) {
                console.log('⚠️ Archivo personalize.json incompleto. Se restablecerán los valores predeterminados.');
                fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
            }
        }
    }
    catch (error) {
        console.error(`❌ Error al verificar o crear el archivo personalize.json: ${error.message}`);
    }
};
handler();
export default handler;
//# sourceMappingURL=auto-personalize.js.map