// __tests__/unit/PingCommandHandler.test.js

import PingCommandHandler from '../../src/commandHandlers/PingCommandHandler.js';
import { PingCommand } from '../../src/commands/PingCommand.js';
import DependencyContainer from '../../src/core/DependencyContainer.js';

describe('PingCommandHandler', () => {
  let pingCommandHandler;
  let mockLogger;
  let mockContext;

  beforeEach(() => {
    DependencyContainer.reset();

    mockLogger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
    };

    mockContext = {
      reply: jest.fn(),
      sock: {
        sendMessage: jest.fn(),
        user: { id: 'botJid' },
      },
      chat: { id: 'chatJid' },
      message: { key: { remoteJid: 'chatJid', id: 'messageId' } },
    };

    DependencyContainer.getInstance().register('logger', () => mockLogger);

    pingCommandHandler = DependencyContainer.getInstance().resolve(PingCommandHandler);
  });

  it('debería responder con Pong! y la latencia', async () => {
    const command = new PingCommand(mockContext);
    await pingCommandHandler.handle(command);

    expect(mockContext.reply).toHaveBeenCalledWith('🏓 ¡Pong! Refactorizado!');
    expect(mockContext.sock.sendMessage).toHaveBeenCalledWith(
      'chatJid',
      expect.objectContaining({ text: expect.stringContaining('⏱️ Latencia:') })
    );
  });

  it('debería manejar un JID de chat inválido', async () => {
    mockContext.chat.id = null; // Simular un JID de chat inválido
    mockContext.message.key.remoteJid = null; // También el remoteJid

    const command = new PingCommand(mockContext);
    await pingCommandHandler.handle(command);

    expect(mockContext.reply).toHaveBeenCalledWith('❌ Error interno: No se pudo determinar el chat para enviar la latencia.');
    expect(mockLogger.error).toHaveBeenCalledWith(
      expect.objectContaining({ err: expect.any(String) }),
      expect.stringContaining('JID inválido para sendMessage')
    );
    expect(mockContext.sock.sendMessage).not.toHaveBeenCalled();
  });
});
