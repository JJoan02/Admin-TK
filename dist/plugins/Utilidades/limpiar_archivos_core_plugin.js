import { readdirSync, unlinkSync } from 'fs';
import path from 'path';
import { CLEAR_CORE_CONFIRMATION_PROMPT, CLEAR_CORE_CONFIRMATION_SUCCESS, CLEAR_CORE_NO_FILES_FOUND, CLEAR_CORE_ERROR, CLEAR_CORE_PERMISSION_DENIED, CLEAR_CORE_TARGET_STRING } from '../../content/utilidades/limpiar_archivos_core-responses';
class LimpiarArchivosCorePlugin {
    name = "LimpiarArchivosCorePlugin";
    commands = [
        {
            name: "limpiar_core",
            alias: ["clearcore", "cleancore"],
            desc: "Elimina archivos que contienen 'core' en su nombre en el directorio raíz del bot. ¡Operación peligrosa!",
            category: "Propietario",
            react: "🗑️",
            execute: async (Yaka, m, { conn, isOwner, text }) => {
                if (!isOwner) {
                    return m.reply(CLEAR_CORE_PERMISSION_DENIED);
                }
                if (text && text.toLowerCase() === 'sí') {
                    const directory = "./";
                    let filesDeleted = 0;
                    try {
                        const files = readdirSync(directory);
                        for (const file of files) {
                            const filePath = path.join(directory, file);
                            if (file.includes(CLEAR_CORE_TARGET_STRING)) {
                                unlinkSync(filePath);
                                filesDeleted++;
                            }
                        }
                        if (filesDeleted > 0) {
                            m.reply(CLEAR_CORE_CONFIRMATION_SUCCESS);
                        }
                        else {
                            m.reply(CLEAR_CORE_NO_FILES_FOUND);
                        }
                    }
                    catch (e) {
                        console.error("Error al limpiar archivos core:", e);
                        m.reply(CLEAR_CORE_ERROR);
                    }
                }
                else {
                    m.reply(CLEAR_CORE_CONFIRMATION_PROMPT);
                }
            }
        }
    ];
}
export default LimpiarArchivosCorePlugin;
//# sourceMappingURL=limpiar_archivos_core_plugin.js.map