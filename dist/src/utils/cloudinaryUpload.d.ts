/**
 * Sube un buffer de imagen/video a Cloudinary.
 * @param {Buffer} buffer - El buffer del archivo a subir.
 * @param {string} resourceType - Tipo de recurso ('image' o 'video').
 * @returns {Promise<string|null>} La URL segura del archivo subido o null si falla.
 */
export declare const uploadToCloudinary: (buffer: any, resourceType?: string) => Promise<any>;
//# sourceMappingURL=cloudinaryUpload.d.ts.map