// owner-convert.ts - Plugin mejorado y optimizado
// Categoría: owner-commands
// Funcionalidad: Comandos exclusivos del propietario
// Convertido automáticamente a TypeScript con mejoras
import fetch from 'node-fetch';
import FormData from 'form-data';
import FileType from 'file-type';
import fs from 'fs';
import path from 'path';
/**
 * Upload file to qu.ax
 * Supported mimetypes:
 * - `image/jpeg`
 * - `image/jpg`
 * - `image/png`
 * @param {Buffer} buffer File Buffer
 * @return {Promise<string>}
 */
async function uploadImage(buffer) {
    try {
        // Create temp directory if it doesn't exist
        const tmpDir = path.join(process.cwd(), 'tmp');
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir, { recursive: true });
        }
        // Get file type
        const fileType = await FileType.fromBuffer(buffer);
        const { ext, mime } = fileType || { ext: 'png', mime: 'image/png' };
        const tempFile = path.join(tmpDir, `temp_${Date.now()}.${ext}`);
        // Save buffer to temp file
        fs.writeFileSync(tempFile, buffer);
        // Create form data
        const form = new FormData();
        form.append('files[]', fs.createReadStream(tempFile));
        // Upload to qu.ax
        const response = await fetch('https://qu.ax/upload.php', {
            method: 'POST',
            body: form,
            headers: form.getHeaders()
        });
        // Clean up temp file
        fs.unlinkSync(tempFile);
        const result = await response.json();
        if (result && result.success) {
            return result.files[0].url;
        }
        else {
            // Fallback to telegraph if qu.ax fails
            const telegraphForm = new FormData();
            telegraphForm.append('file', buffer, {
                filename: `upload.${ext}`,
                contentType: mime
            });
            const telegraphResponse = await fetch('https://telegra.ph/upload', {
                method: 'POST',
                body: telegraphForm
            });
            const img = await telegraphResponse.json();
            if (img[0]?.src) {
                return 'https://telegra.ph' + img[0].src;
            }
            throw new Error('Failed to upload image to both services');
        }
    }
    catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
}
module.exports = { uploadImage };
/**
 * Alternative upload to telegra.ph (backup)
 */
/*
async function uploadImageTelegraph(buffer) {
    try {
        const { ext, mime } = await fileTypeFromBuffer(buffer);
        const form = new FormData();
        const blob = new Blob([buffer.toArrayBuffer()], { type: mime });
        form.append('file', blob, 'tmp.' + ext);

        const response = await fetch('https://telegra.ph/upload', {
            method: 'POST',
            body: form
        });

        const img = await response.json();
        if (img.error) throw img.error;
        return 'https://telegra.ph' + img[0].src;
    } catch (error) {
        throw error;
    }
}
*/
export default {};
//# sourceMappingURL=owner-convert.js.map