/**
 * ========================================
 *          ADMIN-TK DB BACKUP
 * Creado por JJoan02
 * ========================================
 *
 * @description Este script realiza una copia de seguridad de la base de datos.
 * Si se está utilizando la base de datos local (database.json), crea una copia
 * con marca de tiempo en el directorio /backups.
 * Si se está utilizando MongoDB, informa al usuario que debe usar herramientas
 * nativas de MongoDB como 'mongodump'.
 *
 */

import BackupService from '../src/services/BackupService.js';
import logger from '../src/utils/logger.js';

/**
 * Script para ejecutar un backup manual de la base de datos.
 * Se puede ejecutar directamente con `node utils/dbBackup.js`
 */
async function main() {
  logger.info('Iniciando backup manual de la base de datos...');
  try {
    // Puedes elegir si solo quieres un backup local o también subirlo
    const backupPath = await BackupService.createLocalBackup();
    await BackupService.uploadBackup(backupPath); // Opcional: subirlo a Google Drive
    logger.info('Backup manual completado exitosamente.');
  } catch (error) {
    logger.error({ err: error }, '❌ Fallo el backup manual.');
    process.exit(1);
  }
}

main();

// Hemos eliminado la línea "createBackup();" de aquí.
