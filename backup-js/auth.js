const jwt = require('jsonwebtoken');
const ac = require('../config/roles');
const AuditLog = require('../models/AuditLog');
const { initializeLogger } = require('../utils/logger');
const logger = initializeLogger();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    logger.warn('Intento de acceso no autorizado: No se proporcionó token.');
    return res.status(401).json({ error: "Acceso no autorizado: Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    logger.error({ err }, 'Error al verificar token JWT.');
    // Registrar en el log de auditoría si el token es inválido
    AuditLog.logAction(req.user ? req.user.id : null, 'AUTHENTICATION_FAILED', `Token inválido: ${err.message}`);
    res.status(401).json({ error: "Token inválido." });
  }
};

const authorize = (action, resource) => {
  return (req, res, next) => {
    const permission = ac.can(req.user.role)[action](resource);
    if (!permission.granted) {
      logger.warn(`Intento de acceso prohibido para el usuario ${req.user.username} (ID: ${req.user.id}) con rol ${req.user.role}. Acción: ${action}, Recurso: ${resource}.`);
      // Registrar en el log de auditoría la falla de autorización
      AuditLog.logAction(req.user.id, 'AUTHORIZATION_FAILED', `Acceso prohibido. Rol: ${req.user.role}, Acción: ${action}, Recurso: ${resource}.`);
      return res.status(403).json({ error: "Acceso prohibido." });
    }
    next();
  };
};

module.exports = { authenticate, authorize };