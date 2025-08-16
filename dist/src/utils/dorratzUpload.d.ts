/**
 * Sube un archivo a cloud.dorratz.com
 * @param {Buffer} buffer Buffer del archivo a subir.
 * @returns {Promise<string>} La URL del archivo subido.
 * @throws {Error} Si el archivo está vacío, no se puede determinar el tipo MIME, o la subida falla.
 */
export declare const uploadToDorratz: (buffer: any) => Promise<any>;
//# sourceMappingURL=dorratzUpload.d.ts.map