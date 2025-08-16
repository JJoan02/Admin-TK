// src/migrations/001_initial_schema.js
/**
 * @param {import('sqlite').Database} db
 */
export async function up(db) {
    // Crear tabla de analíticas
    await db.exec(`
    CREATE TABLE IF NOT EXISTS analytics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_type TEXT NOT NULL,
      event_data JSON,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
    // Crear tabla de usuarios
    await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      jid TEXT PRIMARY KEY,
      name TEXT,
      role TEXT DEFAULT 'user',
      commandCount INTEGER DEFAULT 0,
      isBanned BOOLEAN DEFAULT FALSE,
      warnings INTEGER DEFAULT 0,
      createdAt TEXT,
      last_activity DATETIME DEFAULT CURRENT_TIMESTAMP,
      cooldowns TEXT DEFAULT '{}',
      isAiEnabled BOOLEAN DEFAULT FALSE,
      updatedAt TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    );
  `);
    // Crear tabla de grupos
    await db.exec(`
    CREATE TABLE IF NOT EXISTS groups (
      jid TEXT PRIMARY KEY,
      subject TEXT,
      creation TEXT,
      owner TEXT,
      size INTEGER,
      isMuted BOOLEAN DEFAULT FALSE,
      welcomeMessage TEXT,
      goodbyeMessage TEXT,
      isBotEnabled BOOLEAN DEFAULT TRUE,
      isAiEnabled BOOLEAN DEFAULT FALSE,
      createdAt TEXT,
      updatedAt TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    );
  `);
    // Crear tabla de chats
    await db.exec(`
    CREATE TABLE IF NOT EXISTS chats (
      jid TEXT PRIMARY KEY,
      isBotMuted BOOLEAN DEFAULT FALSE,
      conversationState TEXT,
      lastInteraction TEXT,
      isAiEnabled BOOLEAN DEFAULT FALSE,
      createdAt TEXT,
      updatedAt TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    );
  `);
    // Crear tabla de eventos para Event Sourcing
    await db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      payload JSON,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      aggregateId TEXT
    );
  `);
    // Crear tabla para Feature Flags
    await db.exec(`
    CREATE TABLE IF NOT EXISTS feature_flags (
      name TEXT PRIMARY KEY,
      is_enabled INTEGER DEFAULT 0
    );
  `);
}
//# sourceMappingURL=001_initial_schema.js.map