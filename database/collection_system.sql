CREATE TABLE IF NOT EXISTS user_collections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    jid TEXT NOT NULL,
    item_id TEXT UNIQUE NOT NULL,
    item_type TEXT NOT NULL,
    item_name TEXT NOT NULL,
    item_description TEXT,
    rarity TEXT NOT NULL,
    image_url TEXT,
    local_path TEXT,
    market_value INTEGER DEFAULT 0,
    obtained_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    tradeable BOOLEAN DEFAULT 1
  );

CREATE TABLE IF NOT EXISTS market_listings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    seller_jid TEXT NOT NULL,
    item_id TEXT NOT NULL,
    item_name TEXT NOT NULL,
    item_type TEXT NOT NULL,
    rarity TEXT NOT NULL,
    image_url TEXT,
    price INTEGER NOT NULL,
    listed_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE IF NOT EXISTS user_coins (
    jid TEXT PRIMARY KEY,
    coins INTEGER DEFAULT 1000,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE IF NOT EXISTS trade_offers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    from_user TEXT NOT NULL,
    to_user TEXT NOT NULL,
    offered_item_id TEXT NOT NULL,
    offered_item_name TEXT NOT NULL,
    offered_item_image TEXT,
    requested_item_id TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );