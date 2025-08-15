export const MEDIAFIRE_NO_LINK = (usedPrefix, command) => `🪐 Ingrese El Link De Mediafire.\n*Ejemplo:* ${usedPrefix + command} https://www.mediafire.com/file/c2fyjyrfckwgkum/ZETSv1%25282%2529.zip/file`;
export const MEDIAFIRE_INVALID_LINK = "Enlace inválido.";
export const MEDIAFIRE_NO_INFO = "No se pudo obtener la información del archivo.";
export const MEDIAFIRE_INFO = (filename, size, link, mimetype) => `
✦ \`Nombre :\` ${filename}
✧ \`Peso :\` ${size}
✦ \`Link :\` ${link}
✧ \`Mime :\` ${mimetype}
`;
export const MEDIAFIRE_ERROR = (error) => `Error: ${error}`;
//# sourceMappingURL=mediafire-responses.js.map