import { v2 as cloudinary } from 'cloudinary';
import config from '../../config/config.js'; // Importar la configuración
import { initializeLogger } from './logger.js';
const logger = initializeLogger();
// Configurar Cloudinary
cloudinary.config({
    cloud_name: config.api.cloudinary.cloudName,
    api_key: config.api.cloudinary.apiKey,
    api_secret: config.api.cloudinary.apiSecret,
});
/**
 * Sube un buffer de imagen/video a Cloudinary.
 * @param {Buffer} buffer - El buffer del archivo a subir.
 * @param {string} resourceType - Tipo de recurso ('image' o 'video').
 * @returns {Promise<string|null>} La URL segura del archivo subido o null si falla.
 */
export const uploadToCloudinary = async (buffer, resourceType = 'image') => {
    try {
        if (!config.api.cloudinary.cloudName || !config.api.cloudinary.apiKey || !config.api.cloudinary.apiSecret) {
            logger.error('Las credenciales de Cloudinary no están configuradas en config.js.');
            return null;
        }
        const uploadResult = await cloudinary.uploader.upload(`data:${resourceType === 'image' ? 'image' : 'video'}/jpeg;base64,${buffer.toString('base64')}`, // Asumimos jpeg para imágenes, pero se puede mejorar
        {
            resource_type: resourceType,
            folder: 'admin-tk-uploads', // Carpeta opcional en Cloudinary
        });
        if (uploadResult && uploadResult.secure_url) {
            logger.debug(`Archivo subido a Cloudinary: ${uploadResult.secure_url}`);
            return uploadResult.secure_url;
        }
        logger.error(`Fallo al subir a Cloudinary: ${JSON.stringify(uploadResult)}`);
        return null;
    }
    catch (error) {
        logger.error({ err: error }, 'Error al subir archivo a Cloudinary.');
        return null;
    }
};
//# sourceMappingURL=cloudinaryUpload.js.map