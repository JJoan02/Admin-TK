const express = require('express');
const router = express.Router();
const DependencyContainer = require('../src/core/DependencyContainer').default; // Importar DependencyContainer
const AuditLog = require('../models/AuditLog');
const { initializeLogger } = require('../utils/logger');
const logger = initializeLogger();

// Registro de usuario
router.post('/register', async (req, res) => {
  const { username, password } = req.body; // Eliminar 'ip' de aquí
  const ip = req.ip; // Obtener IP del request
  try {
    const authService = DependencyContainer.getInstance().resolve('authService');
    const result = await authService.registerUser(username, password, ip); // Pasar IP al servicio
    if (result.success) {
      AuditLog.logAction(result.userId, 'USER_REGISTERED', `Usuario ${username} registrado con éxito desde IP: ${ip}.`);
      res.status(201).json({ id: result.userId, message: result.message });
    } else {
      AuditLog.logAction(null, 'REGISTRATION_FAILED', `Fallo de registro para ${username} desde IP: ${ip}. Mensaje: ${result.message}`);
      res.status(400).json({ error: result.message });
    }
  } catch (err) {
    logger.error({ err }, 'Error en la ruta /register.');
    AuditLog.logAction(null, 'REGISTRATION_ERROR', `Error interno del servidor durante el registro para ${username} desde IP: ${ip}.`);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const ip = req.ip;
  try {
    const authService = DependencyContainer.getInstance().resolve('authService');
    const result = await authService.authenticateUser(username, password);
    if (result.success) {
      AuditLog.logAction(result.user.id, 'USER_LOGIN_SUCCESS', `Usuario ${username} inició sesión con éxito desde IP: ${ip}.`);
      res.json({ token: result.token });
    } else {
      AuditLog.logAction(null, 'USER_LOGIN_FAILED', `Fallo de inicio de sesión para ${username} desde IP: ${ip}. Mensaje: ${result.message}`);
      res.status(401).json({ error: result.message });
    }
  } catch (err) {
    logger.error({ err }, 'Error en la ruta /login.');
    AuditLog.logAction(null, 'LOGIN_ERROR', `Error interno del servidor durante el inicio de sesión para ${username} desde IP: ${ip}.`);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

// Ruta para solicitar restablecimiento de contraseña
router.post('/reset-password', async (req, res) => {
  const { username, whatsappNumber } = req.body;
  const ip = req.ip;
  try {
    const authService = DependencyContainer.getInstance().resolve('authService');
    const notificationService = DependencyContainer.getInstance().resolve('notificationService');
    const result = await authService.generateAndSendResetCode(username, whatsappNumber, notificationService);
    if (result.success) {
      AuditLog.logAction(null, 'PASSWORD_RESET_REQUEST', `Solicitud de restablecimiento de contraseña para ${username} desde IP: ${ip}.`);
      res.json({ message: result.message });
    } else {
      AuditLog.logAction(null, 'PASSWORD_RESET_REQUEST_FAILED', `Fallo en la solicitud de restablecimiento de contraseña para ${username} desde IP: ${ip}. Mensaje: ${result.message}`);
      res.status(400).json({ error: result.message });
    }
  } catch (err) {
    logger.error({ err }, 'Error en la ruta /reset-password.');
    AuditLog.logAction(null, 'PASSWORD_RESET_ERROR', `Error interno del servidor durante la solicitud de restablecimiento de contraseña para ${username} desde IP: ${ip}.`);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

// Ruta para validar código de restablecimiento y actualizar contraseña
router.post('/validate-reset-code', async (req, res) => {
  const { username, code, newPassword } = req.body;
  const ip = req.ip;
  try {
    const authService = DependencyContainer.getInstance().resolve('authService');
    const result = await authService.validateResetCode(username, code);
    if (result.success) {
      const updateResult = await authService.updatePassword(username, newPassword);
      if (updateResult.success) {
        AuditLog.logAction(null, 'PASSWORD_RESET_SUCCESS', `Contraseña de ${username} restablecida con éxito desde IP: ${ip}.`);
        res.json({ message: updateResult.message });
      } else {
        AuditLog.logAction(null, 'PASSWORD_RESET_UPDATE_FAILED', `Fallo al actualizar contraseña para ${username} desde IP: ${ip}. Mensaje: ${updateResult.message}`);
        res.status(400).json({ error: updateResult.message });
      }
    } else {
      AuditLog.logAction(null, 'PASSWORD_RESET_CODE_INVALID', `Código de restablecimiento inválido para ${username} desde IP: ${ip}. Mensaje: ${result.message}`);
      res.status(401).json({ error: result.message });
    }
  } catch (err) {
    logger.error({ err }, 'Error en la ruta /validate-reset-code.');
    AuditLog.logAction(null, 'PASSWORD_RESET_VALIDATION_ERROR', `Error interno del servidor durante la validación del código de restablecimiento para ${username} desde IP: ${ip}.`);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

module.exports = router;
