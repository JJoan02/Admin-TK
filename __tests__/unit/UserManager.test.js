// __tests__/unit/UserManager.test.js

import UserManager from '../../src/core/UserManager.js';
import DependencyContainer from '../../src/core/DependencyContainer.js';
import { UserCreatedEvent, UserUpdatedEvent, UserBannedEvent, UserUnbannedEvent } from '../../src/events/DomainEvents.js';

describe('UserManager', () => {
  let userManager;
  let mockDbService;
  let mockLogger;
  let mockCache;
  let mockEventStore;
  let mockConfig;

  beforeEach(() => {
    // Resetear el contenedor de dependencias para cada prueba
    DependencyContainer.reset();

    mockDbService = {
      get: jest.fn(),
      run: jest.fn(),
      all: jest.fn(),
      getDB: jest.fn(() => ({ run: jest.fn(), all: jest.fn(), get: jest.fn() })) // Mockear getDB para que devuelva un objeto con run, all, get
    };
    mockLogger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
    };
    mockCache = {
      set: jest.fn(),
      get: jest.fn(),
      has: jest.fn(),
      delete: jest.fn(),
    };
    mockEventStore = {
      publish: jest.fn(),
    };
    mockConfig = {
      ownerNumbers: ['1234567890'],
      roles: { user: 'user', owner: 'owner' },
    };

    // Registrar las dependencias mockeadas en el contenedor
    DependencyContainer.getInstance().register('config', () => mockConfig);
    DependencyContainer.getInstance().register('dbService', () => mockDbService);
    DependencyContainer.getInstance().register('logger', () => mockLogger);
    DependencyContainer.getInstance().register('cache', () => mockCache);
    DependencyContainer.getInstance().register('eventStore', () => mockEventStore);

    // Resolver UserManager a través del contenedor para que reciba las dependencias mockeadas
    userManager = DependencyContainer.getInstance().resolve(UserManager);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    it('debería crear un nuevo usuario si no existe', async () => {
      mockDbService.get.mockResolvedValue(null);

      const jid = '12345@s.whatsapp.net';
      const pushName = 'TestUser';
      const user = await userManager.getUser(jid, pushName);

      expect(mockDbService.get).toHaveBeenCalledWith('SELECT * FROM users WHERE jid = ?', jid);
      expect(mockDbService.run).toHaveBeenCalled();
      expect(user).toHaveProperty('jid', jid);
      expect(user).toHaveProperty('name', pushName);
      expect(mockEventStore.publish).toHaveBeenCalledWith(expect.any(UserCreatedEvent));
    });

    it('debería devolver un usuario existente y actualizarlo', async () => {
      const existingUser = {
        jid: '12345@s.whatsapp.net',
        name: 'OldName',
        commandCount: 5,
        isBanned: false,
        role: 'user',
        cooldowns: '{}',
      };
      mockDbService.get.mockResolvedValue(existingUser);
      mockDbService.run.mockResolvedValue({}); // Para updateUser

      const jid = '12345@s.whatsapp.net';
      const pushName = 'NewName';
      const user = await userManager.getUser(jid, pushName);

      expect(mockDbService.get).toHaveBeenCalledWith('SELECT * FROM users WHERE jid = ?', jid);
      expect(mockDbService.run).toHaveBeenCalled(); // Por la llamada a updateUser
      expect(user).toHaveProperty('name', pushName);
      expect(mockEventStore.publish).toHaveBeenCalledWith(expect.any(UserUpdatedEvent));
    });

    it('debería asignar el rol de owner si el JID está en ownerNumbers', async () => {
      const jid = '1234567890@s.whatsapp.net'; // JID del owner
      mockDbService.get.mockResolvedValue(null);
      mockDbService.run.mockResolvedValue({});

      const user = await userManager.getUser(jid, 'Owner');
      expect(user).toHaveProperty('role', 'owner');
      expect(mockEventStore.publish).toHaveBeenCalledWith(expect.any(UserCreatedEvent));
    });
  });

  describe('banUser', () => {
    it('debería banear a un usuario y publicar un evento', async () => {
      const jid = 'user1@s.whatsapp.net';
      const userData = { jid, isBanned: false };
      userManager.users.set(jid, userData); // Simular que el usuario está en caché
      mockDbService.run.mockResolvedValue({});

      await userManager.banUser(jid);

      expect(userData.isBanned).toBe(true);
      expect(mockDbService.run).toHaveBeenCalled();
      expect(mockEventStore.publish).toHaveBeenCalledWith(expect.any(UserBannedEvent));
    });

    it('no debería banear a un usuario ya baneado', async () => {
      const jid = 'user1@s.whatsapp.net';
      const userData = { jid, isBanned: true };
      userManager.users.set(jid, userData);
      mockDbService.run.mockResolvedValue({});

      await userManager.banUser(jid);

      expect(userData.isBanned).toBe(true);
      expect(mockDbService.run).not.toHaveBeenCalled(); // No debería llamar a la DB
      expect(mockEventStore.publish).not.toHaveBeenCalled(); // No debería publicar evento
    });
  });

  describe('unbanUser', () => {
    it('debería desbanear a un usuario y publicar un evento', async () => {
      const jid = 'user1@s.whatsapp.net';
      const userData = { jid, isBanned: true };
      userManager.users.set(jid, userData);
      mockDbService.run.mockResolvedValue({});

      await userManager.unbanUser(jid);

      expect(userData.isBanned).toBe(false);
      expect(mockDbService.run).toHaveBeenCalled();
      expect(mockEventStore.publish).toHaveBeenCalledWith(expect.any(UserUnbannedEvent));
    });

    it('no debería desbanear a un usuario no baneado', async () => {
      const jid = 'user1@s.whatsapp.net';
      const userData = { jid, isBanned: false };
      userManager.users.set(jid, userData);
      mockDbService.run.mockResolvedValue({});

      await userManager.unbanUser(jid);

      expect(userData.isBanned).toBe(false);
      expect(mockDbService.run).not.toHaveBeenCalled();
      expect(mockEventStore.publish).not.toHaveBeenCalled();
    });
  });
});
