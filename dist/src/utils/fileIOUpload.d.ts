/**
 * Sube un archivo efímero a file.io
 * `Expira en 1 día`
 * `Tamaño máximo de 100MB`
 * @param {Buffer} buffer Buffer del archivo
 * @returns {Promise<string>} Enlace del archivo subido
 */
export declare const fileIO: (buffer: any) => Promise<any>;
/**
 * Sube un archivo a storage.restfulapi.my.id
 * @param {Buffer} buffer Buffer del archivo
 * @returns {Promise<string>} Enlace del archivo subido
 */
export declare const RESTfulAPI: (buffer: any) => Promise<any>;
//# sourceMappingURL=fileIOUpload.d.ts.map