# 🚀 Guía de Instalación Admin-TK en VPS

Esta guía te ayudará a configurar Admin-TK en tu VPS para que el dashboard esté disponible en **admin-tk.fun** automáticamente al iniciar el bot.

## 📋 Información del Sistema

- **Dominio**: admin-tk.fun
- **IP VPS**: 206.183.129.67
- **Puerto Dashboard**: 3000
- **Puerto API**: 3001
- **DNS**: Configurado correctamente

## 🔧 Instalación Automática

### Paso 1: Conectar a la VPS

```bash
ssh root@206.183.129.67
```

### Paso 2: Clonar el repositorio (si no está ya)

```bash
cd /root
git clone https://github.com/JJoan02/Admin-TK.git
cd Admin-TK
```

### Paso 3: Ejecutar el instalador automático

```bash
chmod +x scripts/install-vps.sh
./scripts/install-vps.sh
```

El script automáticamente:
- ✅ Actualiza el sistema
- ✅ Instala Node.js 18
- ✅ Instala PM2 para gestión de procesos
- ✅ Configura el firewall
- ✅ Instala dependencias del proyecto
- ✅ Compila TypeScript
- ✅ Configura Nginx como proxy reverso
- ✅ Crea archivos de configuración
- ✅ Inicia Admin-TK automáticamente

## 🎯 Acceso al Dashboard

Una vez completada la instalación, podrás acceder al dashboard en:

- **🌐 Dominio principal**: https://admin-tk.fun
- **🌐 IP directa**: http://206.183.129.67:3000
- **🔌 API**: http://admin-tk.fun:3001

## 📊 Gestión del Servicio

### Comandos básicos con PM2:

```bash
# Ver estado
pm2 status

# Ver logs en tiempo real
pm2 logs admin-tk

# Reiniciar
pm2 restart admin-tk

# Detener
pm2 stop admin-tk

# Iniciar
pm2 start admin-tk
```

### Scripts de gestión incluidos:

```bash
# Iniciar Admin-TK
./start.sh

# Detener Admin-TK
./stop.sh

# Reiniciar Admin-TK
./restart.sh

# Ver estado y logs
./status.sh

# Actualizar desde Git
./update.sh
```

## 🔒 Configuración SSL (Opcional)

Para habilitar HTTPS con certificados gratuitos de Let's Encrypt:

```bash
# Instalar Certbot
apt install certbot python3-certbot-nginx

# Obtener certificados
certbot --nginx -d admin-tk.fun -d www.admin-tk.fun

# Configurar renovación automática
crontab -e
# Agregar: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🔥 Configuración del Firewall

El script automáticamente configura UFW, pero puedes verificar:

```bash
# Ver estado del firewall
ufw status

# Los puertos abiertos son:
# - 22 (SSH)
# - 80 (HTTP)
# - 443 (HTTPS)
# - 3000 (Dashboard)
# - 3001 (API)
```

## 📁 Estructura de Archivos

```
/root/Admin-TK/
├── config/
│   ├── domain.config.js      # Configuración del dominio
│   └── domain.config.d.ts    # Tipos TypeScript
├── scripts/
│   ├── install-vps.sh        # Instalador automático
│   ├── start-vps.sh          # Script de inicio
│   └── admin-tk.service      # Servicio systemd
├── src/
│   └── core/
│       ├── AdminTKServer.ts  # Servidor principal
│       └── DashboardServer.ts # Servidor del dashboard
├── public/                   # Archivos web del dashboard
├── storage/                  # Base de datos y backups
├── logs/                     # Archivos de log
├── .env                      # Variables de entorno
├── ecosystem.config.js       # Configuración PM2
└── README-VPS.md            # Esta guía
```

## 🐛 Solución de Problemas

### El dashboard no carga

1. Verificar que Admin-TK esté ejecutándose:
   ```bash
   pm2 status
   ```

2. Verificar logs:
   ```bash
   pm2 logs admin-tk
   ```

3. Verificar que el puerto esté abierto:
   ```bash
   netstat -tlnp | grep 3000
   ```

### Error de conexión

1. Verificar Nginx:
   ```bash
   systemctl status nginx
   nginx -t
   ```

2. Reiniciar servicios:
   ```bash
   systemctl restart nginx
   pm2 restart admin-tk
   ```

### Problemas de DNS

1. Verificar que el dominio apunte a la IP correcta:
   ```bash
   nslookup admin-tk.fun
   ```

2. Verificar configuración de Nginx:
   ```bash
   cat /etc/nginx/sites-available/admin-tk.fun
   ```

## 📝 Logs Importantes

- **PM2 Logs**: `pm2 logs admin-tk`
- **Nginx Access**: `/var/log/nginx/admin-tk.fun.access.log`
- **Nginx Error**: `/var/log/nginx/admin-tk.fun.error.log`
- **Sistema**: `/var/log/syslog`

## 🔄 Inicio Automático

PM2 está configurado para iniciar automáticamente al arrancar el sistema:

```bash
# Verificar configuración de inicio automático
pm2 startup
pm2 save
```

## 🎉 Funcionalidades del Dashboard

Una vez funcionando, el dashboard incluye:

- ✅ **Panel de control estilo Pterodactyl**
- ✅ **Gestión de bots en tiempo real**
- ✅ **Estadísticas del sistema**
- ✅ **WebSocket para actualizaciones en vivo**
- ✅ **API REST completa**
- ✅ **Interfaz responsive**
- ✅ **Logs en tiempo real**
- ✅ **Gestión de QR codes**

## 📞 Soporte

Si tienes problemas:

1. Revisa los logs con `pm2 logs admin-tk`
2. Verifica el estado con `./status.sh`
3. Reinicia el servicio con `./restart.sh`

## 🚀 ¡Listo!

Tu dashboard Admin-TK ahora está funcionando en **https://admin-tk.fun** y se iniciará automáticamente cada vez que arranques tu VPS.

¡Disfruta de tu panel de control estilo Pterodactyl para Admin-TK! 🎯
