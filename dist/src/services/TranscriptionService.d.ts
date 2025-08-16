export declare class TranscriptionService {
    #private;
    static cache: Map<any, any>;
    constructor(config: any, logger: any, errorHandler: any);
    initialize(): void;
    /**
     * Transcribe audio usando Gemini Vision
     * @param {Buffer} audioBuffer - Buffer de audio en formato opus/mp3
     * @param {string} mimeType - Tipo MIME del audio
     * @returns {Promise<{transcription: string, summary: string}>}
     */
    transcribeAudio(audioBuffer: any, mimeType?: string): Promise<any>;
}
export default TranscriptionService;
//# sourceMappingURL=TranscriptionService.d.ts.map