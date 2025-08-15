import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { spawn } from 'child_process';
import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();
import * as Helpers from '../utils/helpers.js';
import { fileTypeFromBuffer } from 'file-type';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMP_DIR = path.resolve(__dirname, '../../tmp');
const CODECS = {
    OGG: {
        args: ['-vn', '-c:a', 'libopus', '-b:a', '128k', '-vbr', 'on', '-compression_level', '10'],
        ext: 'ogg'
    },
    MP3: {
        args: ['-vn', '-c:a', 'libmp3lame', '-b:a', '128k', '-q:a', '0'],
        ext: 'mp3'
    },
    MP4: {
        args: ['-c:v', 'libx264', '-c:a', 'aac', '-b:a', '128k', '-strict', 'experimental', '-movflags', '+faststart'],
        ext: 'mp4'
    },
    WEBM: {
        args: ['-c:v', 'libvpx-vp9', '-c:a', 'libopus', '-b:v', '1M', '-crf', '30'],
        ext: 'webm'
    },
    WEBP_STATIC: {
        args: ['-c:v', 'libwebp', '-lossless', '0', '-quality', '80', '-compression_level', '6'],
        ext: 'webp'
    },
    WEBP_ANIMATED: {
        args: ['-c:v', 'libwebp', '-lossless', '0', '-quality', '80', '-compression_level', '6', '-loop', '0', '-an'],
        ext: 'webp'
    },
    GIF: {
        args: ['-vf', 'fps=10,scale=640:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse', '-loop', '0'],
        ext: 'gif'
    }
};
export const checkFFmpegInstallation = async () => {
    return new Promise((resolve) => {
        const ffmpeg = spawn('ffmpeg', ['-version']);
        ffmpeg.on('error', () => resolve(false));
        ffmpeg.on('close', (code) => resolve(code === 0));
        setTimeout(() => {
            ffmpeg.kill();
            resolve(false);
        }, 5000);
    });
};
const runFFmpeg = (inputPath, args, outputExt) => {
    const outputPath = path.join(TEMP_DIR, `output_${Date.now()}.${outputExt}`);
    const allArgs = ['-i', inputPath, ...args, '-y', outputPath];
    logger.debug(`Ejecutando FFmpeg: ffmpeg ${allArgs.join(' ')}`);
    return new Promise((resolve, reject) => {
        const ffmpegProcess = spawn('ffmpeg', allArgs);
        let errorOutput = '';
        ffmpegProcess.on('error', (err) => {
            logger.error({ err }, 'Error al iniciar FFmpeg. Asegúrate de que esté instalado y en el PATH.');
            reject(err);
        });
        ffmpegProcess.stderr.on('data', (data) => {
            errorOutput += data.toString();
            logger.debug(`FFmpeg stderr: ${data}`);
        });
        ffmpegProcess.on('close', async (code) => {
            if (code === 0) {
                try {
                    const outputBuffer = await fs.readFile(outputPath);
                    resolve({ data: outputBuffer, path: outputPath });
                }
                catch (readErr) {
                    logger.error({ err: readErr }, 'Error al leer el archivo de salida de FFmpeg.');
                    reject(readErr);
                }
            }
            else {
                const errorMsg = `FFmpeg terminó con código de error: ${code}\n${errorOutput}`;
                logger.error(errorMsg);
                reject(new Error(errorMsg));
            }
        });
    });
};
const prepareInputFile = async (input, inputExt = 'bin') => {
    await fs.mkdir(TEMP_DIR, { recursive: true });
    let inputPath;
    let needsCleanup = false;
    if (Buffer.isBuffer(input)) {
        inputPath = path.join(TEMP_DIR, `input_${Date.now()}.${inputExt}`);
        await fs.writeFile(inputPath, input);
        needsCleanup = true;
    }
    else if (Helpers.isUrl(input)) {
        const downloaded = await Helpers.getBuffer(input, true);
        if (!downloaded || !downloaded.filename) {
            throw new Error(`No se pudo descargar el archivo desde la URL: ${input}`);
        }
        inputPath = downloaded.filename;
        needsCleanup = true;
    }
    else {
        inputPath = input;
    }
    const cleanup = async () => {
        if (needsCleanup) {
            try {
                await fs.unlink(inputPath);
                logger.debug(`Archivo temporal de entrada eliminado: ${inputPath}`);
            }
            catch (cleanErr) {
                logger.warn({ err: cleanErr }, `Error al limpiar archivo de entrada temporal: ${inputPath}`);
            }
        }
    };
    return { inputPath, cleanup };
};
const cleanUpFile = async (filePath) => {
    if (!filePath)
        return;
    try {
        await fs.unlink(filePath);
        logger.debug(`Archivo temporal eliminado: ${filePath}`);
    }
    catch (cleanErr) {
        logger.warn({ err: cleanErr }, `Error al limpiar archivo temporal: ${filePath}`);
    }
};
const convertMedia = async (input, inputExt, ffmpegArgs, outputExt) => {
    const isFFmpegInstalled = await checkFFmpegInstallation();
    if (!isFFmpegInstalled) {
        logger.error('FFmpeg no está instalado en el sistema');
        return null;
    }
    let inputPath, outputPath;
    try {
        const { inputPath: ip, cleanup } = await prepareInputFile(input, inputExt);
        inputPath = ip;
        const result = await runFFmpeg(inputPath, ffmpegArgs, outputExt);
        outputPath = result.path;
        await cleanup();
        await cleanUpFile(outputPath);
        return result.data;
    }
    catch (error) {
        logger.error({ err: error }, 'Error en la conversión de medios');
        await cleanUpFile(inputPath);
        await cleanUpFile(outputPath);
        return null;
    }
};
export const toAudio = async (input, inputExt) => {
    const result = await convertMedia(input, inputExt, CODECS.OGG.args, CODECS.OGG.ext);
    if (result) {
        const filename = path.join(TEMP_DIR, `audio_${Date.now()}.${CODECS.OGG.ext}`);
        await fs.writeFile(filename, result);
        return { data: result, filename: filename };
    }
    return null;
};
export const toMp3 = async (input, inputExt) => {
    return convertMedia(input, inputExt, CODECS.MP3.args, CODECS.MP3.ext);
};
export const toMp4 = async (input, inputExt) => {
    return convertMedia(input, inputExt, CODECS.MP4.args, CODECS.MP4.ext);
};
export const toWebm = async (input, inputExt) => {
    return convertMedia(input, inputExt, CODECS.WEBM.args, CODECS.WEBM.ext);
};
export const webpToMp4 = async (input) => {
    return convertMedia(input, 'webp', CODECS.MP4.args, 'mp4');
};
export const toWebp = async (input, inputExt, animated = false) => {
    const codec = animated ? CODECS.WEBP_ANIMATED : CODECS.WEBP_STATIC;
    return convertMedia(input, inputExt, codec.args, codec.ext);
};
export const toGif = async (input, inputExt) => {
    return convertMedia(input, inputExt, CODECS.GIF.args, CODECS.GIF.ext);
};
export const convertVideo = async (input, inputExt, format) => {
    const formatMap = {
        mp4: toMp4,
        webm: toWebm,
        gif: toGif,
        ogg: toAudio,
        mp3: toMp3
    };
    const converter = formatMap[format.toLowerCase()];
    if (!converter) {
        logger.error(`Formato de conversión no soportado: ${format}`);
        return null;
    }
    return converter(input, inputExt);
};
export const optimizeImage = async (input, inputExt, options = {}) => {
    const { quality = 80, width, height } = options;
    let scaleFilter = '';
    if (width || height) {
        scaleFilter = `,scale=${width || -1}:${height || -1}:flags=lanczos`;
    }
    const args = [
        '-vf', `format=rgb24${scaleFilter}`,
        '-q:v', quality.toString()
    ];
    return convertMedia(input, inputExt, args, inputExt || 'jpg');
};
export const extractAudio = async (input, inputExt, format = 'mp3') => {
    const formatMap = {
        mp3: toMp3,
        ogg: toAudio,
        wav: (input, ext) => convertMedia(input, ext, ['-vn', '-c:a', 'pcm_s16le'], 'wav')
    };
    const converter = formatMap[format.toLowerCase()];
    if (!converter) {
        logger.error(`Formato de audio no soportado: ${format}`);
        return null;
    }
    return converter(input, inputExt);
};
export const changeSpeed = async (input, inputExt, speed = 1.0) => {
    const args = [
        '-filter_complex', `[0:v]setpts=${1 / speed}*PTS[v];[0:a]atempo=${speed}[a]`,
        '-map', '[v]',
        '-map', '[a]'
    ];
    return convertMedia(input, inputExt, args, inputExt || 'mp4');
};
export const trimMedia = async (input, inputExt, start, duration) => {
    const args = [
        '-ss', start.toString(),
        '-t', duration.toString()
    ];
    return convertMedia(input, inputExt, args, inputExt || 'mp4');
};
export const combineMedia = async (inputs, outputFormat) => {
    if (!inputs || inputs.length < 2) {
        logger.error('Se requieren al menos dos archivos para combinar');
        return null;
    }
    const tempFiles = [];
    let concatFilePath;
    let outputPath;
    try {
        for (const input of inputs) {
            const { inputPath, cleanup } = await prepareInputFile(input);
            tempFiles.push({ path: inputPath, cleanup });
        }
        concatFilePath = path.join(TEMP_DIR, `concat_${Date.now()}.txt`);
        const concatContent = tempFiles.map(file => `file '${file.path}'`).join('\n');
        await fs.writeFile(concatFilePath, concatContent);
        outputPath = path.join(TEMP_DIR, `combined_${Date.now()}.${outputFormat}`);
        const ffmpegArgs = [
            '-f', 'concat',
            '-safe', '0',
            '-i', concatFilePath,
            '-c', 'copy',
            '-y',
            outputPath
        ];
        logger.debug(`Ejecutando FFmpeg para combinar: ffmpeg ${ffmpegArgs.join(' ')}`);
        const ffmpegProcess = spawn('ffmpeg', ffmpegArgs);
        await new Promise((resolve, reject) => {
            let errorOutput = '';
            ffmpegProcess.on('error', (err) => {
                logger.error({ err }, 'Error al iniciar FFmpeg para combinar archivos.');
                reject(err);
            });
            ffmpegProcess.stderr.on('data', (data) => {
                errorOutput += data.toString();
                logger.debug(`FFmpeg stderr: ${data}`);
            });
            ffmpegProcess.on('close', (code) => {
                if (code === 0) {
                    resolve();
                }
                else {
                    const errorMsg = `FFmpeg terminó con código de error: ${code}\n${errorOutput}`;
                    logger.error(errorMsg);
                    reject(new Error(errorMsg));
                }
            });
        });
        const outputBuffer = await fs.readFile(outputPath);
        return outputBuffer;
    }
    catch (error) {
        logger.error({ err: error }, 'Error al combinar archivos multimedia');
        return null;
    }
    finally {
        const cleanUpPromises = [];
        for (const file of tempFiles) {
            cleanUpPromises.push(file.cleanup());
        }
        if (concatFilePath) {
            cleanUpPromises.push(cleanUpFile(concatFilePath));
        }
        if (outputPath) {
            cleanUpPromises.push(cleanUpFile(outputPath));
        }
        await Promise.all(cleanUpPromises);
    }
};
export const toWebpSticker = async (mediaBuffer, animated = false) => {
    const inputExt = (await fileTypeFromBuffer(mediaBuffer))?.ext || 'bin';
    let ffmpegArgs;
    if (animated) {
        ffmpegArgs = [
            '-vf', 'scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:(ow-iw)/2:(oh-ih)/2,fps=15,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse',
            '-loop', '0',
            '-an'
        ];
    }
    else {
        ffmpegArgs = [
            '-vf', 'scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:(ow-iw)/2:(oh-ih)/2',
            '-vframes', '1'
        ];
    }
    return convertMedia(mediaBuffer, inputExt, ffmpegArgs, 'webp');
};
export const extractFrame = async (videoBuffer, timestamp = 0) => {
    const inputExt = (await fileTypeFromBuffer(videoBuffer))?.ext || 'mp4';
    const ffmpegArgs = [
        '-ss', timestamp.toString(),
        '-frames:v', '1'
    ];
    return convertMedia(videoBuffer, inputExt, ffmpegArgs, 'png');
};
export const compressVideo = async (videoBuffer, quality = 23) => {
    const inputExt = (await fileTypeFromBuffer(videoBuffer))?.ext || 'mp4';
    const ffmpegArgs = [
        '-crf', quality.toString(),
        '-preset', 'fast',
        '-c:v', 'libx264',
        '-c:a', 'aac',
        '-b:a', '128k'
    ];
    return convertMedia(videoBuffer, inputExt, ffmpegArgs, 'mp4');
};
//# sourceMappingURL=media.js.map