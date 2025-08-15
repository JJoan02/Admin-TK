// __tests__/unit/AIService.test.js

import AIService from '../../src/services/AIService.js';
import DependencyContainer from '../../src/core/DependencyContainer.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Mockear GoogleGenerativeAI
jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      generateContent: jest.fn().mockResolvedValue({
        response: {
          text: jest.fn().mockReturnValue('Mocked AI response'),
        },
      }),
    }),
  })),
}));

describe('AIService', () => {
  let aiService;
  let mockConfig;
  let mockLogger;
  let mockMemoryService;
  let mockChatManager;
  let mockErrorHandler;

  beforeEach(() => {
    DependencyContainer.reset();

    mockConfig = {
      api: { geminiApiKey: 'test-api-key' },
      botName: 'TestBot',
    };
    mockLogger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
    };
    mockMemoryService = {
      getRecentInteractions: jest.fn().mockResolvedValue([]),
      getFactsForChat: jest.fn().mockResolvedValue([]),
      addInteraction: jest.fn().mockResolvedValue(true),
    };
    mockChatManager = {
      updateChat: jest.fn().mockResolvedValue(true),
      getChat: jest.fn().mockResolvedValue({ personality_profile: null }),
    };
    mockErrorHandler = {
      handleError: jest.fn(),
      startCorrelation: jest.fn().mockReturnValue('corrId'),
      endCorrelation: jest.fn(),
    };

    DependencyContainer.getInstance().register('config', () => mockConfig);
    DependencyContainer.getInstance().register('logger', () => mockLogger);
    DependencyContainer.getInstance().register('memoryService', () => mockMemoryService);
    DependencyContainer.getInstance().register('chatManager', () => mockChatManager);
    DependencyContainer.getInstance().register('errorHandler', () => mockErrorHandler);

    aiService = DependencyContainer.getInstance().resolve(AIService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería generar una respuesta estándar de IA para grupos', async () => {
    const context = {
      isGroup: true,
      user: { jid: 'user1@s.whatsapp.net', name: 'TestUser' },
      chat: { id: 'group1@g.us' },
      group: { subject: 'TestGroup' },
      message: { key: { id: 'msg1' } },
      messageText: 'Hello AI',
      sock: { user: { id: 'botJid', name: 'Bot' } },
    };

    const response = await aiService.generateResponse(context);

    expect(response.text).toBe('Mocked AI response');
    expect(GoogleGenerativeAI).toHaveBeenCalledWith('test-api-key');
    expect(aiService._executeGeneration).toHaveBeenCalled();
    expect(mockMemoryService.addInteraction).toHaveBeenCalledTimes(2); // User and bot interaction
  });

  it('debería generar una respuesta ilimitada para chats privados si UNLIMITED_MODE es true', async () => {
    process.env.UNLIMITED_MODE = 'true';
    const context = {
      isGroup: false,
      user: { jid: 'user1@s.whatsapp.net', name: 'TestUser' },
      chat: { id: 'user1@s.whatsapp.net' },
      message: { key: { id: 'msg1' } },
      messageText: 'Hello AI',
      sock: { user: { id: 'botJid', name: 'Bot' } },
    };

    const response = await aiService.generateResponse(context);

    expect(response.text).toBe('Mocked AI response');
    expect(mockChatManager.updateChat).toHaveBeenCalled(); // Debería intentar establecer personalidad
    expect(aiService._generateUnlimitedResponse).toHaveBeenCalled();
  });

  it('debería manejar errores durante la generación de contenido', async () => {
    aiService.#genAI.getGenerativeModel().generateContent.mockImplementationOnce(() => {
      throw new Error('API error');
    });

    const context = {
      isGroup: false,
      user: { jid: 'user1@s.whatsapp.net', name: 'TestUser' },
      chat: { id: 'user1@s.whatsapp.net' },
      message: { key: { id: 'msg1' } },
      messageText: 'Hello AI',
      sock: { user: { id: 'botJid', name: 'Bot' } },
    };

    const response = await aiService.generateResponse(context);

    expect(response.text).toContain('problemas para procesar');
    expect(mockErrorHandler.handleError).toHaveBeenCalled();
    expect(mockMemoryService.addInteraction).toHaveBeenCalledTimes(2); // Aún guarda la interacción
  });
});
