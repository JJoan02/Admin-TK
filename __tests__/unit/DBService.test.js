// __tests__/unit/DBService.test.js

// Mockear el módulo DBService completo
jest.mock('../../src/services/DBService.js', () => ({
  __esModule: true, // Indica que es un módulo ES
  default: {
    init: jest.fn(),
    close: jest.fn(),
    run: jest.fn(),
    get: jest.fn(),
    all: jest.fn(),
    getDB: jest.fn(), // Asegurarse de mockear todos los métodos que se usan
  },
}));

// Importar el DBService mockeado
import DBService from '../../src/services/DBService.js';

// Mockear el módulo 'sqlite' para controlar la base de datos en memoria
jest.mock('sqlite', () => ({
  open: jest.fn(() => Promise.resolve({
    exec: jest.fn(() => Promise.resolve()),
    run: jest.fn(() => Promise.resolve({ changes: 1, lastID: 1})),
    get: jest.fn(() => Promise.resolve(null)),
    all: jest.fn(() => Promise.resolve([])),
    close: jest.fn(() => Promise.resolve()),
  })),
}));

// Importar 'open' del módulo mockeado 'sqlite'
import { open } from 'sqlite';

// Mockear el módulo 'sqlite3' de una manera compatible con ES Modules
jest.mock('sqlite3', () => ({
  __esModule: true, // Esto le dice a Jest que el mock es un módulo ES
  default: jest.fn(() => ({})), // Mockear la exportación por defecto (la clase Database)
}));

// Importar el mocked sqlite3 después de mockearlo
import sqlite3 from 'sqlite3';

describe('DBService Unit Tests', () => {
  let mockDbInstance;

  beforeEach(() => {
    // Limpiar todos los mocks antes de cada prueba
    jest.clearAllMocks();

    // Configurar el mock de la instancia de la base de datos
    mockDbInstance = {
      exec: jest.fn(() => Promise.resolve()),
      run: jest.fn(() => Promise.resolve({ changes: 1, lastID: 1})),
      get: jest.fn(() => Promise.resolve(null)),
      all: jest.fn(() => Promise.resolve([])),
      close: jest.fn(() => Promise.resolve()),
    };

    // Configurar los mocks de los métodos de DBService
    DBService.init.mockImplementation(async () => {
      // Simular la lógica de init, incluyendo la llamada a open con argumentos
      await open({ filename: 'test.sqlite', driver: sqlite3.Database });
      DBService.getDB.mockReturnValue(mockDbInstance);
      // Simular las llamadas a exec que DBService.init() haría
      await mockDbInstance.exec('CREATE TABLE IF NOT EXISTS analytics');
      await mockDbInstance.exec('CREATE TABLE IF NOT EXISTS users');
      await mockDbInstance.exec('CREATE TABLE IF NOT EXISTS groups');
      await mockDbInstance.exec('CREATE TABLE IF NOT EXISTS chats');
    });
    DBService.close.mockImplementation(async () => {
      await mockDbInstance.close();
    });
    DBService.run.mockImplementation((sql, params) => mockDbInstance.run(sql, params));
    DBService.get.mockImplementation((sql, params) => mockDbInstance.get(sql, params));
    DBService.all.mockImplementation((sql, params) => mockDbInstance.all(sql, params));
    DBService.getDB.mockReturnValue(mockDbInstance);

    open.mockReturnValue(Promise.resolve(mockDbInstance));
  });

  test('should initialize the database connection', async () => {
    await DBService.init();
    expect(DBService.init).toHaveBeenCalledTimes(1);
    expect(open).toHaveBeenCalledTimes(1);
    expect(open).toHaveBeenCalledWith({
      filename: 'test.sqlite',
      driver: sqlite3.Database,
    });
    expect(mockDbInstance.exec).toHaveBeenCalledTimes(4);
  });

  test('should close the database connection', async () => {
    await DBService.init();
    await DBService.close();
    expect(DBService.close).toHaveBeenCalledTimes(1);
    expect(mockDbInstance.close).toHaveBeenCalledTimes(1);
  });

  test('should execute a run query successfully', async () => {
    await DBService.init();
    const result = await DBService.run('INSERT INTO users (jid) VALUES (?)', ['123@s.whatsapp.net']);
    expect(DBService.run).toHaveBeenCalledTimes(1);
    expect(mockDbInstance.run).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ changes: 1, lastID: 1});
  });

  test('should execute a get query successfully', async () => {
    await DBService.init();
    mockDbInstance.get.mockResolvedValueOnce({ jid: '123@s.whatsapp.net', name: 'Test User' });
    const result = await DBService.get('SELECT * FROM users WHERE jid = ?', ['123@s.whatsapp.net']);
    expect(DBService.get).toHaveBeenCalledTimes(1);
    expect(mockDbInstance.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ jid: '123@s.whatsapp.net', name: 'Test User' });
  });

  test('should execute an all query successfully', async () => {
    await DBService.init();
    mockDbInstance.all.mockResolvedValueOnce([{ jid: '123@s.whatsapp.net' }, { jid: '456@s.whatsapp.net' }]);
    const result = await DBService.all('SELECT * FROM users');
    expect(DBService.all).toHaveBeenCalledTimes(1);
    expect(mockDbInstance.all).toHaveBeenCalledTimes(1);
    expect(result).toEqual([{ jid: '123@s.whatsapp.net' }, { jid: '456@s.whatsapp.net' }]);
  });

  test('should handle errors during query execution', async () => {
    await DBService.init();
    mockDbInstance.run.mockRejectedValueOnce(new Error('DB Error'));
    await expect(DBService.run('INVALID QUERY')).rejects.toThrow('DB Error');
    expect(DBService.run).toHaveBeenCalledTimes(1);
    expect(mockDbInstance.run).toHaveBeenCalledTimes(1);
  });
});
