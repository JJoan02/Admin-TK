// src/commandHandlers/ProcessTextCommandHandler.js - REFACTORIZADO
import { initializeLogger } from '../utils/logger.js';
import Auth from '../utils/auth.js';
const logger = initializeLogger();
/**
 * Manejador para el comando ProcessTextCommand.
 * Valida y EJECUTA DIRECTAMENTE el comando específico del plugin.
 */
export class ProcessTextCommandHandler {
    #pluginLoader;
    #userManager;
    constructor(pluginLoader, userManager) {
        this.#pluginLoader = pluginLoader;
        this.#userManager = userManager;
    }
    async handle(command) {
        const { context } = command;
        logger.debug(`Buscando comando: ${context.command}`);
        const commandToExecute = this.#pluginLoader.getCommand(context.command);
        if (!commandToExecute || typeof commandToExecute.execute !== 'function') {
            logger.warn(`❓ Comando desconocido o sin método execute '${context.command}' intentado por ${context.user.jid}.`);
            return;
        }
        if (!this.#hasPermissions(commandToExecute, context)) {
            logger.warn(`🚫 Intento de ejecución sin permisos del comando '${commandToExecute.name}' por ${context.user.jid}.`);
            return context.reply('❌ No tienes los permisos necesarios para ejecutar este comando.');
        }
        if (commandToExecute.minArgs && context.args.length < commandToExecute.minArgs) {
            const usage = `Uso correcto: *${context.config.prefix}${context.command} ${commandToExecute.usage || ''}*`.trim();
            return context.reply(`⚠️ Argumentos insuficientes.\n${usage}`);
        }
        const isOnCooldown = await this.#checkAndSetCooldown(commandToExecute, context);
        if (isOnCooldown) {
            return;
        }
        try {
            logger.debug(`🚀 Ejecutando directamente el comando '${commandToExecute.name}'.`);
            await commandToExecute.execute(context);
            await this.#userManager.incrementCommandCount(context.user.jid);
        }
        catch (error) {
            logger.error(`💥 ¡ERROR AL EJECUTAR EL COMANDO '${commandToExecute.name}'!`);
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
        const requiredPermission = commandPlugin.permission || 'user';
        logger.debug(`Verificando permisos: Usuario rol '${user.role}', Comando requiere '${requiredPermission}'.`);
        return Auth.hasMinRole(user.role, requiredPermission);
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
//# sourceMappingURL=ProcessTextCommandHandler.js.map