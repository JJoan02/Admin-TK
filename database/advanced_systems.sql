CREATE TABLE IF NOT EXISTS rpg_users (
      jid TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      level INTEGER DEFAULT 1,
      exp INTEGER DEFAULT 0,
      hp INTEGER DEFAULT 100,
      mp INTEGER DEFAULT 50,
      strength INTEGER DEFAULT 10,
      defense INTEGER DEFAULT 10,
      agility INTEGER DEFAULT 10,
      intelligence INTEGER DEFAULT 10,
      gold INTEGER DEFAULT 100,
      class TEXT DEFAULT 'Novato',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE IF NOT EXISTS user_collections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      jid TEXT NOT NULL,
      item_type TEXT NOT NULL,
      item_id TEXT NOT NULL,
      rarity TEXT NOT NULL,
      obtained_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (jid) REFERENCES rpg_users (jid)
    );

CREATE TABLE IF NOT EXISTS rpg_inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      jid TEXT NOT NULL,
      item_name TEXT NOT NULL,
      item_type TEXT NOT NULL,
      quantity INTEGER DEFAULT 1,
      FOREIGN KEY (jid) REFERENCES rpg_users (jid)
    );