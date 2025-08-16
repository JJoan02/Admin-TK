// src/commandHandlers/MenuCommandHandler.js

import config from '../../config/config.js';
import { roleHierarchy } from '../utils/auth.js';

export class MenuCommandHandler {
  #userManager;
  #dbService;
  #pluginLoader;

  constructor(userManager, dbService, pluginLoader) {
    this.#userManager = userManager;
    this.#dbService = dbService;
    this.#pluginLoader = pluginLoader;
  }

  async handle(command) {
    const { context } = command;
    const { user, isGroup, reply } = context;

    const botName = config.botName;
    const ownerName = 'JJoan02';
    const totalUsers = Object.keys(await this.#userManager.getAllUsers()).length;
    const totalChats = (await this.#dbService.all('SELECT COUNT(*) as count FROM chats'))[0].count;
    const totalGroups = (await this.#dbService.all('SELECT COUNT(*) as count FROM groups'))[0].count;
    const bannedUsers = (await this.#dbService.all('SELECT COUNT(*) as count FROM users WHERE isBanned = TRUE'))[0].count;
    const bannedChats = (await this.#dbService.all('SELECT COUNT(*) as count FROM chats WHERE isBotMuted = TRUE'))[0].count;

    const uptimeMs = process.uptime() * 1000;
    const uptime = this.#clockString(uptimeMs);

    const d = new Date();
    const locale = 'es';
    const week = d.toLocaleDateString(locale, { weekday: 'long' });
    const date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    const time = d.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', second: 'numeric' });
    const horarioFecha = `${week}, ${date} || ${time}`;

    const userLevel = roleHierarchy[user.role.toLowerCase()] || 1;

    let menuText = `👋 ¡Hola, *${user.name}*! Soy *${botName}*.\n\n`;
    menuText += `📅 *Fecha y Hora:* ${horarioFecha}\n`;
    menuText += `⏰ *Actividad del Bot:* ${uptime}\n`;
    menuText += `👥 *Usuarios Totales:* ${totalUsers}\n`;
    menuText += `🚫 *Chats Baneados:* ${bannedChats}\n`;
    menuText += `🚫 *Usuarios Baneados:* ${bannedUsers}\n`;
    menuText += `⚙️ *Prefijo:* ${config.prefix}\n`;
    menuText += `🚀 *Versión:* ${process.env.npm_package_version || '1.0.0'}\n\n`;

    menuText += `*╭━〔 COMANDOS DISPONIBLES 〕⬣*\n`;

    const categorizedCommands = new Map();
    for (const cmd of this.#pluginLoader.getAllCommands().values()) {
      const requiredLevel = roleHierarchy[(cmd.permission || 'user').toLowerCase()] || 1;
      if (userLevel < requiredLevel) continue;
      if (cmd.isGroupOnly && !isGroup) continue;

      const category = cmd.pluginName || 'General';
      if (!categorizedCommands.has(category)) {
        categorizedCommands.set(category, []);
      }
      categorizedCommands.get(category).push(cmd);
    }

    if (categorizedCommands.size === 0) {
      menuText += 'Parece que no hay comandos disponibles para ti aquí.\n';
    } else {
      const sortedCategories = [...categorizedCommands.keys()].sort();
      for (const category of sortedCategories) {
        menuText += `┃\n┃ *${category.toUpperCase()}*\n`;
        const sortedCommands = categorizedCommands.get(category).sort((a, b) => a.name.localeCompare(b.name));
        for (const cmd of sortedCommands) {
          menuText += `┃ ∘ ${config.prefix}${cmd.name}${cmd.alias && cmd.alias.length > 0 ? ` [${cmd.alias.join(', ')}]` : ''}: ${cmd.description}\n`;
        }
      }
    }
    menuText += `╰━━━━━━━━━━━━━⬣\n\n`;
    menuText += `👑 *Desarrollado por ${ownerName}*\n`;
    menuText += `_Si algo no funciona, utiliza ${config.prefix}reporte <problema>_`;

    await reply(menuText);
  }

  #clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
  }
}

export default MenuCommandHandler;
