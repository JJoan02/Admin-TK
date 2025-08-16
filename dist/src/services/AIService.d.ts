export declare class AIService {
    #private;
    constructor(memoryService: any, config: any, logger: any, errorHandler: any);
    generateResponse(context: any): Promise<{
        text: string;
        reaction: null;
    }>;
    _generateStandardResponse(context: any): Promise<{
        text: string;
        reaction: null;
    }>;
    _generateUnlimitedResponse(context: any, personality: any): Promise<{
        text: string;
        reaction: null;
    }>;
    _executeGeneration(fullPrompt: any, model: any, context: any): Promise<{
        text: string;
        reaction: null;
    }>;
    generateRawText(prompt: any): Promise<any>;
}
export default AIService;
//# sourceMappingURL=AIService.d.ts.map