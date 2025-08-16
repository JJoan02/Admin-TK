CREATE TABLE IF NOT EXISTS trade_offers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    from_user TEXT NOT NULL,
    to_user TEXT NOT NULL,
    offered_item TEXT NOT NULL,
    requested_item TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE IF NOT EXISTS active_games (
    user_jid TEXT PRIMARY KEY,
    game_type TEXT NOT NULL,
    game_data TEXT NOT NULL,
    expires_at INTEGER NOT NULL
  );

CREATE TABLE IF NOT EXISTS dating_profiles (
    jid TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER DEFAULT 18,
    interests TEXT,
    looking_for TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE IF NOT EXISTS user_reputation (
    jid TEXT PRIMARY KEY,
    points INTEGER DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE IF NOT EXISTS reputation_given (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    from_user TEXT NOT NULL,
    to_user TEXT NOT NULL,
    points INTEGER NOT NULL,
    given_at INTEGER NOT NULL
  );