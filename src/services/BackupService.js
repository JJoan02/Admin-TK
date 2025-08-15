// src/services/BackupService.js

import fs from 'fs/promises';
import path from 'path';
import cfonts from 'cfonts';
import { google } from 'googleapis';
import { askQuestion } from '../utils/helpers.js';

class BackupService {
  #config;
  #logger;
  #dbService;
  #drive;

  constructor(config, logger, dbService) {
    this.#config = config;
    this.#logger = logger;
    this.#dbService = dbService;
    this.#drive = null; // El cliente de Google Drive se inicializará después de la autenticación
    this.backupDir = path.resolve(process.cwd(), 'backups');
    this.#logger.info('BackupService inicializado.');
  }

  /**
   * Muestra un menú interactivo y estilizado para gestionar backups.
   */
  async showBackupMenu() {
    if (this.#config.skipBackupMenu === true) {
      this.#logger.info('⏩ Saltando menú de backup debido a SKIP_BACKUP_MENU=true.');
      return;
    }

    console.clear();
    cfonts.say('BACKUPS', {
      font: 'block',
      align: 'center',
      colors: ['yellow', 'white'],
      background: 'transparent',
      space: true,
    });
    this.#logger.info('--- Gestión de Copia de Seguridad ---');
    this.#logger.info('1️⃣ Continuar (usar solo backups locales).');
    this.#logger.info('2️⃣ Vincular/Re-vincular cuenta de Google Drive.');
    this.#logger.info('3️⃣ Crear backup local y subir a Google Drive (requiere vinculación).');
    this.#logger.info('------------------------------------');

    let choice = '';
    while (!['1', '2', '3'].includes(choice)) {
      choice = await askQuestion('Elige una opción (1-3): ');
    }

    try {
      switch (choice) {
        case '1':
          this.#logger.info('Continuando sin acción de backup inmediato.');
          break;
        case '2':
          await this.linkGoogleDrive();
          break;
        case '3':
          await this.authorize();
          if (this.#drive) {
            const backupPath = await this.createLocalBackup();
            if (backupPath) {
              await this.uploadBackup(backupPath);
            } else {
              this.#logger.error('No se pudo crear el backup local. No se subirá a Google Drive.');
            }
          } else {
            this.#logger.error('No se pudo subir el backup. La cuenta de Google Drive no está vinculada o la autorización falló.');
          }
          break;
      }
    } catch (error) {
      this.#logger.error({ err: error }, '❌ Error durante la operación del menú de backup.');
    } finally {
      this.#logger.info('--- Fin de la Gestión de Backups ---');
      await askQuestion('Presiona Enter para continuar con el arranque del bot...');
    }
  }

  /**
   * Autoriza al cliente para usar la API de Google Drive.
   * Carga el token guardado o inicia el proceso de vinculación si no existe.
   */
  async authorize() {
    try {
      const credentialsContent = await fs.readFile(this.#config.credentialsPath, 'utf8');
      const credentials = JSON.parse(credentialsContent);
      
      if (!credentials.installed) {
        throw new Error('Formato inválido en credentials.json: falta la propiedad "installed".');
      }
      const { client_secret, client_id, redirect_uris } = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

      try {
        const tokenContent = await fs.readFile(this.#config.tokenPath, 'utf8');
        const token = JSON.parse(tokenContent);
        oAuth2Client.setCredentials(token);
        this.#drive = google.drive({ version: 'v3', auth: oAuth2Client });
        this.#logger.info('Token de Google Drive cargado exitosamente.');
      } catch (err) {
        this.#logger.warn({ err }, 'No se encontró un token de Google Drive o es inválido. Se requiere vinculación.');
        await this.getAccessToken(oAuth2Client);
      }
    } catch (error) {
      this.#logger.error({ err: error }, '❌ Error al leer `credentials.json` o `token.json`. Asegúrate de que los archivos existen y están en el directorio raíz, y que su formato es correcto.');
      this.#drive = null;
      throw error; // Propagar el error para que showBackupMenu lo maneje
    }
  }

  /**
   * Inicia el proceso para obtener un nuevo token de acceso.
   * @param {import('google-auth-library').OAuth2Client} oAuth2Client
   */
  async getAccessToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/drive.file'],
    });
    this.#logger.info('Por favor, autoriza esta aplicación visitando esta URL en tu navegador:');
    console.log(authUrl);
    const code = await askQuestion('Pega el código de autorización que obtuviste aquí: ');

    try {
      const { tokens } = await oAuth2Client.getToken(code);
      if (!tokens) {
        throw new Error('No se recibieron tokens de acceso.');
      }
      oAuth2Client.setCredentials(tokens);
      await fs.writeFile(this.#config.tokenPath, JSON.stringify(tokens));
      this.#logger.info('Token guardado exitosamente en gdrive_token.json');
      this.#drive = google.drive({ version: 'v3', auth: oAuth2Client });
    } catch (err) {
      this.#logger.error({ err }, '❌ Error al obtener o guardar el token de acceso. Asegúrate de que el código de autorización sea válido.');
      this.#drive = null;
      throw err; // Propagar el error
    }
  }

  /**
   * Fuerza el proceso de vinculación o re-vinculación.
   */
  async linkGoogleDrive() {
    try {
      const credentialsContent = await fs.readFile(this.#config.credentialsPath, 'utf8');
      const credentials = JSON.parse(credentialsContent);
      
      if (!credentials.installed) {
        throw new Error('Formato inválido en credentials.json: falta la propiedad "installed".');
      }
      const { client_secret, client_id, redirect_uris } = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
      await this.getAccessToken(oAuth2Client);
      this.#logger.info('✅ Vinculación con Google Drive completada exitosamente.');
    } catch (error) {
      this.#logger.error({ err: error }, '❌ Error al vincular/re-vincular Google Drive. Asegúrate de que `credentials.json` sea válido y el proceso de autorización se complete.');
      throw error; // Propagar el error
    }
  }

  /**
   * Crea un backup local de la base de datos.
   * @returns {Promise<string>} La ruta al archivo de backup creado.
   */
  async createLocalBackup() {
    try {
      await fs.mkdir(this.backupDir, { recursive: true });
      const timestamp = new Date().toISOString().replace(/:/g, '-');
      let backupFileName;
      let backupFilePath;

      const db = this.#dbService.getDB(); // Obtener la instancia de la DB

      if (this.#dbService.dbType === 'SQLite') {
        backupFileName = `admin-tk_backup_${timestamp}.sqlite`;
        backupFilePath = path.join(this.backupDir, backupFileName);
        // Asegurarse de que la DB es SQLite antes de intentar el backup
        await db.backup(backupFilePath); // Método de backup de sqlite
        this.#logger.info(`💾 Backup local de SQLite creado: ${backupFileName}`);
      } else if (this.#dbService.dbType === 'LowDB') {
        backupFileName = `admin-tk_backup_${timestamp}.json`;
        backupFilePath = path.join(this.backupDir, backupFileName);
        const dbFilePath = this.#dbService.dbPath;
        await fs.copyFile(dbFilePath, backupFilePath);
        this.#logger.info(`💾 Backup local de LowDB copiado: ${backupFileName}`);
      } else {
        this.#logger.warn(`Tipo de base de datos '${this.#dbService.dbType}' no soporta backup local automático.`);
        return null; // No se pudo crear el backup local
      }
      return backupFilePath;
    } catch (error) {
      this.#logger.error({ err: error }, '❌ Error al crear el backup local.');
      return null; // Devolver null si falla la creación del backup
    }
  }

  /**
   * Sube un backup a Google Drive.
   * @param {string} filePath - La ruta al archivo de backup a subir.
   */
  async uploadBackup(filePath) {
    if (!this.#drive) {
      this.#logger.warn('No se puede subir el backup, Google Drive no está vinculado.');
      return;
    }
    if (!filePath) {
      this.#logger.warn('No se puede subir el backup, la ruta del archivo es nula.');
      return;
    }

    try {
      const fileName = path.basename(filePath);
      const fileStat = await fs.stat(filePath);
      const fileSize = fileStat.size;

      // Determinar el MIME type basado en la extensión del archivo
      let mimeType = 'application/octet-stream'; // Default
      if (filePath.endsWith('.sqlite')) {
        mimeType = 'application/x-sqlite3';
      } else if (filePath.endsWith('.json')) {
        mimeType = 'application/json';
      }

      const requestBody = {
        name: fileName,
        parents: [], // Por defecto, sin carpeta padre
      };

      // Si config.googleDrive.backupFolderId está definido y es válido, usarlo
      if (this.#config.googleDrive && this.#config.googleDrive.backupFolderId) {
        requestBody.parents.push(this.#config.googleDrive.backupFolderId);
      }

      const res = await this.#drive.files.create({
        requestBody: requestBody,
        media: {
          mimeType: mimeType,
          body: fs.createReadStream(filePath),
        },
      });

      this.#logger.info(`☁️ Backup subido a Google Drive exitosamente. File ID: ${res.data.id}, Tamaño: ${fileSize} bytes.`);
    } catch (error) {
      this.#logger.error({ err: error, filePath }, '❌ Error al subir el backup a Google Drive.');
      throw error; // Propagar el error para que showBackupMenu lo maneje
    }
  }
}

export default BackupService;