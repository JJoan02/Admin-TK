// src/commandHandlers/ProcessTextCommandHandler.js

import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();
import config from '../../config/config.js';
import Auth from '../utils/auth.js';

/**
 * Manejador para el comando ProcessTextCommand.
 * Valida y despacha el comando específico del plugin al CommandBus.
 */
class ProcessTextCommandHandler {
  #pluginLoader;
  #userManager;
  #commandBus;

  constructor(pluginLoader, userManager, commandBus) {
    this.#pluginLoader = pluginLoader;
    this.#userManager = userManager;
    this.#commandBus = commandBus;
  }

  /**
   * Maneja la ejecución de un comando de texto.
   * @param {ProcessTextCommand} command - El comando que contiene el contexto del mensaje.
   */
  async handle(command) {
    const { context } = command;
    logger.debug(`Buscando comando: ${context.command}`);
    const commandPlugin = this.#pluginLoader.getCommand(context.command);

    if (!commandPlugin || !commandPlugin.command) {
      logger.warn(`❓ Comando desconocido o no refactorizado '${context.command}' intentado por ${context.user.jid}.`);
      return;
    }

    if (!this.#hasPermissions(commandPlugin, context)) {
      logger.warn(`🚫 Intento de ejecución sin permisos del comando '${commandPlugin.name}' por ${context.user.jid}.`);
      return context.reply('❌ No tienes los permisos necesarios para ejecutar este comando.');
    }

    if (commandPlugin.minArgs && context.args.length < commandPlugin.minArgs) {
      const usage = `Uso correcto: *${config.prefix}${context.command} ${commandPlugin.usage || ''}*`.trim();
      return context.reply(`⚠️ Argumentos insuficientes.
${usage}`);
    }

    const isOnCooldown = await this.#checkAndSetCooldown(commandPlugin, context);
    if (isOnCooldown) {
      return;
    }

    try {
      logger.debug(`🚀 Despachando el comando específico '${commandPlugin.command.name}' al CommandBus.`);
      // Instanciar y despachar el comando específico del plugin
      const specificCommand = new commandPlugin.command(context);
      await this.#commandBus.dispatch(specificCommand);

      await this.#userManager.incrementCommandCount(context.user.jid);
    } catch (error) {
      logger.error(`💥 ¡ERROR AL DESPACHAR EL COMANDO '${commandPlugin.name}'!`);
      logger.error({ err: error, command: context.command, args: context.args });
      await context.reply('❌ ¡Ups! Ocurrió un error inesperado al procesar el comando. El desarrollador ha sido notificado.');
    }
  }

  #hasPermissions(commandPlugin, context) {
    const { user, isGroup } = context;

    if (commandPlugin.isGroupOnly && !isGroup) {
      context.reply('Este comando solo puede ser usado en grupos.');
      return false;
    }

    logger.debug(`Verificando permisos: Usuario rol '${user.role}', Comando requiere '${commandPlugin.permission}'.`);
    return Auth.hasMinRole(user.role, commandPlugin.permission);
  }

  async #checkAndSetCooldown(commandPlugin, context) {
    if (!commandPlugin.cooldown || commandPlugin.cooldown <= 0 || Auth.isOwner(context.user.role)) {
      return false;
    }

    const { user } = context;
    const now = Date.now();
    const cooldowns = user.cooldowns || {};
    const lastExecution = cooldowns[commandPlugin.name] || 0;
    const cooldownTime = commandPlugin.cooldown * 1000;

    if (now - lastExecution < cooldownTime) {
      const timeLeft = ((lastExecution + cooldownTime - now) / 1000).toFixed(1);
      logger.warn(`⏳ Comando '${commandPlugin.name}' en cooldown para ${user.jid}. Tiempo restante: ${timeLeft}s`);
      await context.reply(`⏳ Por favor, espera *${timeLeft} segundos* antes de usar este comando de nuevo.`);
      return true;
    }

    cooldowns[commandPlugin.name] = now;
    await this.#userManager.updateUser(user.jid, { cooldowns });

    return false;
  }
}

export default ProcessTextCommandHandler;

