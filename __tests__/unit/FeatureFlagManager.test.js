// __tests__/unit/FeatureFlagManager.test.js

import FeatureFlagManager from '../../src/core/FeatureFlagManager.js';
import DependencyContainer from '../../src/core/DependencyContainer.js';

describe('FeatureFlagManager', () => {
  let featureFlagManager;
  let mockDbService;
  let mockLogger;

  beforeEach(() => {
    DependencyContainer.reset();

    mockDbService = {
      getDB: jest.fn(() => ({
        all: jest.fn(),
        run: jest.fn(),
      })),
    };
    mockLogger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
    };

    DependencyContainer.getInstance().register('dbService', () => mockDbService);
    DependencyContainer.getInstance().register('logger', () => mockLogger);

    featureFlagManager = DependencyContainer.getInstance().resolve(FeatureFlagManager);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('init', () => {
    it('debería cargar los flags existentes de la base de datos', async () => {
      mockDbService.getDB().all.mockResolvedValueOnce([
        { name: 'featureA', is_enabled: 1 },
        { name: 'featureB', is_enabled: 0 },
      ]);

      await featureFlagManager.init();

      expect(mockDbService.getDB().all).toHaveBeenCalledWith('SELECT * FROM feature_flags');
      expect(featureFlagManager.isEnabled('featureA')).toBe(true);
      expect(featureFlagManager.isEnabled('featureB')).toBe(false);
      expect(featureFlagManager.getAllFlags().size).toBe(2);
    });

    it('debería manejar errores al cargar flags de la base de datos', async () => {
      mockDbService.getDB().all.mockRejectedValueOnce(new Error('DB error'));

      await expect(featureFlagManager.init()).rejects.toThrow('Error al cargar feature flags.');
      expect(mockLogger.error).toHaveBeenCalled();
    });
  });

  describe('isEnabled', () => {
    beforeEach(async () => {
      mockDbService.getDB().all.mockResolvedValueOnce([
        { name: 'testFlag', is_enabled: 1 },
        { name: 'anotherFlag', is_enabled: 0 },
      ]);
      await featureFlagManager.init();
    });

    it('debería devolver true si el flag está habilitado', () => {
      expect(featureFlagManager.isEnabled('testFlag')).toBe(true);
    });

    it('debería devolver false si el flag está deshabilitado', () => {
      expect(featureFlagManager.isEnabled('anotherFlag')).toBe(false);
    });

    it('debería devolver false si el flag no existe', () => {
      expect(featureFlagManager.isEnabled('nonExistentFlag')).toBe(false);
    });
  });

  describe('setFlag', () => {
    it('debería habilitar un flag y persistirlo', async () => {
      mockDbService.getDB().run.mockResolvedValueOnce({});

      await featureFlagManager.setFlag('newFeature', true);

      expect(mockDbService.getDB().run).toHaveBeenCalledWith(
        `INSERT OR REPLACE INTO feature_flags (name, is_enabled) VALUES (?, ?)`,
        'newFeature',
        1
      );
      expect(featureFlagManager.isEnabled('newFeature')).toBe(true);
    });

    it('debería deshabilitar un flag y persistirlo', async () => {
      mockDbService.getDB().run.mockResolvedValueOnce({});

      await featureFlagManager.setFlag('existingFeature', false);

      expect(mockDbService.getDB().run).toHaveBeenCalledWith(
        `INSERT OR REPLACE INTO feature_flags (name, is_enabled) VALUES (?, ?)`,
        'existingFeature',
        0
      );
      expect(featureFlagManager.isEnabled('existingFeature')).toBe(false);
    });

    it('debería manejar errores al persistir el flag', async () => {
      mockDbService.getDB().run.mockRejectedValueOnce(new Error('DB write error'));

      await expect(featureFlagManager.setFlag('failingFlag', true)).rejects.toThrow('Error al establecer feature flag.');
      expect(mockLogger.error).toHaveBeenCalled();
    });
  });

  describe('getAllFlags', () => {
    it('debería devolver todos los flags cargados', async () => {
      mockDbService.getDB().all.mockResolvedValueOnce([
        { name: 'flag1', is_enabled: 1 },
        { name: 'flag2', is_enabled: 0 },
      ]);
      await featureFlagManager.init();

      const allFlags = featureFlagManager.getAllFlags();
      expect(allFlags.get('flag1')).toBe(true);
      expect(allFlags.get('flag2')).toBe(false);
      expect(allFlags.size).toBe(2);
    });
  });
});
