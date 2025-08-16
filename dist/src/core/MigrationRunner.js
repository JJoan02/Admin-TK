// src/core/MigrationRunner.js
import fs from 'fs/promises';
import path from 'path';
import DBService from '../services/DBService.js';
import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();
const MIGRATIONS_TABLE = '_migrations';
const MIGRATIONS_DIR = path.resolve(process.cwd(), 'src', 'migrations');
import { pathToFileURL } from 'url';
export class MigrationRunner {
    async run() {
        logger.info('Iniciando proceso de migración de base de datos...');
        await this.#ensureMigrationsTable();
        const executedMigrations = await this.#getExecutedMigrations();
        const availableMigrations = await this.#getAvailableMigrations();
        const pendingMigrations = availableMigrations.filter((file) => !executedMigrations.has(file));
        if (pendingMigrations.length === 0) {
            logger.info('✅ La base de datos ya está actualizada.');
            return;
        }
        logger.warn(`Se encontraron ${pendingMigrations.length} migraciones pendientes.`);
        for (const migrationFile of pendingMigrations) {
            await this.#executeMigration(migrationFile);
        }
        logger.info('✅ Todas las migraciones pendientes se han ejecutado exitosamente.');
    }
    async #executeMigration(file) {
        logger.info(`Ejecutando migración: ${file}...`);
        const migrationPath = path.join(MIGRATIONS_DIR, file);
        const migrationUrl = pathToFileURL(migrationPath).href; // Convertir a URL para compatibilidad con Windows ESM
        try {
            const { up } = await import(migrationUrl);
            if (typeof up !== 'function') {
                throw new Error(`La migración ${file} no exporta una función 'up'.`);
            }
            // Aquí podrías iniciar una transacción si tu DB lo soporta
            await up(DBService.getDB());
            // Y aquí la confirmarías
            await DBService.getDB().run(`INSERT INTO ${MIGRATIONS_TABLE} (name) VALUES (?)`, [file]);
            logger.info(`✅ Migración ${file} completada y registrada.`);
        }
        catch (error) {
            logger.fatal({ err: error, migration: file }, '❌ Error fatal durante la migración. El bot no puede continuar.');
            // Aquí podrías revertir la transacción
            throw error; // Relanzar para detener el arranque del bot
        }
    }
    async #ensureMigrationsTable() {
        await DBService.getDB().run(`
      CREATE TABLE IF NOT EXISTS ${MIGRATIONS_TABLE} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    }
    async #getExecutedMigrations() {
        const rows = await DBService.getDB().all(`SELECT name FROM ${MIGRATIONS_TABLE}`);
        return new Set(rows.map(row => row.name));
    }
    async #getAvailableMigrations() {
        try {
            const files = await fs.readdir(MIGRATIONS_DIR);
            return files.filter(file => file.endsWith('.js')).sort();
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                logger.warn('No se encontró el directorio de migraciones. Creándolo.');
                await fs.mkdir(MIGRATIONS_DIR, { recursive: true });
                return [];
            }
            throw error;
        }
    }
}
export default MigrationRunner;
//# sourceMappingURL=MigrationRunner.js.map