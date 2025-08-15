const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/auth');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');
const { initializeLogger } = require('../utils/logger');
const logger = initializeLogger();

// Obtener servidores del usuario
router.get('/', authenticate, async (req, res) => {
  try {
    // Asumiendo que req.user.id está disponible después de authenticate
    const servers = await User.getServers(req.user.id);
    AuditLog.logAction(req.user.id, 'GET_SERVERS', `Usuario ${req.user.username} obtuvo la lista de sus servidores.`);
    res.json(servers);
  } catch (err) {
    logger.error({ err }, 'Error al obtener servidores.');
    AuditLog.logAction(req.user.id, 'GET_SERVERS_FAILED', `Fallo al obtener servidores para el usuario ${req.user.username}. Mensaje: ${err.message}`);
    res.status(500).json({ error: "Error al obtener servidores" });
  }
});

// Crear nuevo servidor
router.post('/', authenticate, async (req, res) => {
  const { name } = req.body;
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: "El nombre del servidor no puede estar vacío." });
  }
  try {
    // Asumiendo que req.user.id está disponible después de authenticate
    const serverId = await User.createServer(req.user.id, name);
    AuditLog.logAction(req.user.id, 'CREATE_SERVER', `Usuario ${req.user.username} creó un nuevo servidor: ${name} (ID: ${serverId}).`);
    res.status(201).json({ id: serverId, message: "Servidor creado con éxito" });
  } catch (err) {
    logger.error({ err }, 'Error al crear servidor.');
    AuditLog.logAction(req.user.id, 'CREATE_SERVER_FAILED', `Fallo al crear servidor para el usuario ${req.user.username}. Nombre: ${name}. Mensaje: ${err.message}`);
    res.status(500).json({ error: "Error al crear servidor" });
  }
});

module.exports = router;