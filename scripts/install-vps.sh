#!/bin/bash

# scripts/install-vps.sh - Script de instalación completa para VPS Admin-TK

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Función para logging
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
}

info() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] INFO: $1${NC}"
}

header() {
    echo -e "${PURPLE}[$(date +'%Y-%m-%d %H:%M:%S')] === $1 ===${NC}"
}

# Banner de inicio
clear
echo -e "${PURPLE}"
echo "  ╔═══════════════════════════════════════════════════════════════╗"
echo "  ║                                                               ║"
echo "  ║                    🤖 ADMIN-TK INSTALLER 🤖                   ║"
echo "  ║                                                               ║"
echo "  ║              Instalador automático para VPS                  ║"
echo "  ║                   Dominio: admin-tk.fun                      ║"
echo "  ║                   IP: 206.183.129.67                        ║"
echo "  ║                                                               ║"
echo "  ╚═══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Configuración
DOMAIN="admin-tk.fun"
VPS_IP="206.183.129.67"
PROJECT_DIR="/root/Admin-TK"
DASHBOARD_PORT="3000"
API_PORT="3001"

log "🚀 Iniciando instalación de Admin-TK..."

# Verificar que somos root
if [ "$EUID" -ne 0 ]; then
    error "Este script debe ejecutarse como root"
    exit 1
fi

# Actualizar sistema
header "ACTUALIZANDO SISTEMA"
log "📦 Actualizando paquetes del sistema..."
dnf update -y

# Instalar dependencias del sistema
header "INSTALANDO DEPENDENCIAS"
log "🔧 Habilitando repositorio EPEL para dependencias adicionales..."
dnf install -y epel-release
log "🔧 Instalando grupo de herramientas de desarrollo..."
dnf groupinstall -y "Development Tools"
log "🔧 Instalando dependencias del sistema..."
dnf install -y curl wget git python3 python3-pip nginx ufw htop nano vim

# Habilitar y iniciar el firewall
log "🔥 Habilitando y iniciando UFW..."
systemctl enable --now ufw

# Instalar Node.js 18
header "INSTALANDO NODE.JS"
if ! command -v node &> /dev/null || [ "$(node --version | cut -d'v' -f2 | cut -d'.' -f1)" -lt 18 ]; then
    log "📥 Instalando Node.js 18..."
    dnf module install -y nodejs:18
else
    log "✅ Node.js ya está instalado: $(node --version)"
fi

# Verificar instalación de Node.js
NODE_VERSION=$(node --version)
NPM_VERSION=$(npm --version)
log "✅ Node.js $NODE_VERSION instalado"
log "✅ npm $NPM_VERSION instalado"

# Instalar PM2 para gestión de procesos
header "INSTALANDO PM2"
if ! command -v pm2 &> /dev/null; then
    log "🔄 Instalando PM2..."
    npm install -g pm2
    pm2 startup
else
    log "✅ PM2 ya está instalado"
fi

# Configurar firewall
header "CONFIGURANDO FIREWALL"
log "🔥 Configurando UFW..."
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow $DASHBOARD_PORT/tcp
ufw allow $API_PORT/tcp
ufw --force enable
log "✅ Firewall configurado"

# Crear directorio del proyecto si no existe
if [ ! -d "$PROJECT_DIR" ]; then
    log "📁 Creando directorio del proyecto..."
    mkdir -p "$PROJECT_DIR"
fi

cd "$PROJECT_DIR"

# Verificar que estamos en el directorio correcto del proyecto
if [ ! -f "package.json" ]; then
    error "No se encontró package.json en $PROJECT_DIR"
    error "Asegúrate de que el código de Admin-TK esté en $PROJECT_DIR"
    exit 1
fi

# Instalar dependencias del proyecto
header "INSTALANDO DEPENDENCIAS DEL PROYECTO"
log "📦 Instalando dependencias de Node.js..."
npm install --production

# Compilar TypeScript
header "COMPILANDO PROYECTO"
log "🔨 Compilando TypeScript..."
npm run build

# Crear directorios necesarios
header "CREANDO ESTRUCTURA DE DIRECTORIOS"
log "📁 Creando directorios necesarios..."
mkdir -p storage/database
mkdir -p storage/backups
mkdir -p logs
mkdir -p tmp
mkdir -p sessions

# Configurar permisos
log "🔐 Configurando permisos..."
chmod +x scripts/*.sh
chmod 755 storage
chmod 755 logs
chmod 755 tmp

# Crear archivo .env de producción
header "CONFIGURANDO VARIABLES DE ENTORNO"
log "⚙️ Creando archivo .env..."
cat > .env << EOF
# Configuración de producción para Admin-TK
NODE_ENV=production

# Configuración del servidor
DASHBOARD_PORT=$DASHBOARD_PORT
API_PORT=$API_PORT
HOST=0.0.0.0

# Configuración del dominio
DOMAIN=$DOMAIN
VPS_IP=$VPS_IP

# URLs
DASHBOARD_URL=https://$DOMAIN
API_URL=https://$DOMAIN:$API_PORT

# Configuración de CORS
ALLOWED_ORIGINS=https://$DOMAIN,https://www.$DOMAIN,http://localhost:3000,http://$VPS_IP:3000

# Configuración de seguridad
JWT_SECRET=$(openssl rand -base64 32)
SESSION_SECRET=$(openssl rand -base64 32)

# Configuración de SSL
SSL_ENABLED=false
SSL_CERT_PATH=/etc/letsencrypt/live/$DOMAIN/fullchain.pem
SSL_KEY_PATH=/etc/letsencrypt/live/$DOMAIN/privkey.pem

# Configuración de base de datos
DB_PATH=./storage/database/admin-tk.db
DB_BACKUP_PATH=./storage/backups/

# Configuración de logs
LOG_LEVEL=info
LOG_FILE=./logs/admin-tk.log

# Configuración de WhatsApp
WHATSAPP_SESSION_PATH=./sessions
WHATSAPP_BACKUP_INTERVAL=3600000

# Configuración de plugins
PLUGINS_ENABLED=true
PLUGINS_AUTO_LOAD=true
EOF

log "✅ Archivo .env creado"

# Configurar Nginx como proxy reverso
header "CONFIGURANDO NGINX"
log "🌐 Configurando Nginx como proxy reverso..."

cat > /etc/nginx/sites-available/$DOMAIN << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN $VPS_IP;

    # Redirigir todo el tráfico HTTP a HTTPS (cuando esté configurado)
    # return 301 https://\$server_name\$request_uri;

    # Por ahora, servir directamente
    location / {
        proxy_pass http://localhost:$DASHBOARD_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }

    # API endpoints
    location /api/ {
        proxy_pass http://localhost:$DASHBOARD_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # WebSocket para Socket.IO
    location /socket.io/ {
        proxy_pass http://localhost:$DASHBOARD_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Archivos estáticos
    location /static/ {
        proxy_pass http://localhost:$DASHBOARD_PORT;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /assets/ {
        proxy_pass http://localhost:$DASHBOARD_PORT;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Logs
    access_log /var/log/nginx/$DOMAIN.access.log;
    error_log /var/log/nginx/$DOMAIN.error.log;
}
EOF

# Habilitar el sitio
ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Verificar configuración de Nginx
nginx -t

# Reiniciar Nginx
systemctl restart nginx
systemctl enable nginx

log "✅ Nginx configurado"

# Configurar PM2 para Admin-TK
header "CONFIGURANDO PM2"
log "🔄 Configurando PM2 para Admin-TK..."

cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'admin-tk',
    script: 'index.ts',
    cwd: '$PROJECT_DIR',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      DASHBOARD_PORT: '$DASHBOARD_PORT',
      API_PORT: '$API_PORT',
      DOMAIN: '$DOMAIN',
      VPS_IP: '$VPS_IP'
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_file: './logs/pm2-combined.log',
    time: true,
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
    max_memory_restart: '1G',
    watch: false,
    ignore_watch: ['node_modules', 'logs', 'storage', 'tmp'],
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

log "✅ Configuración de PM2 creada"

# Instalar certificados SSL con Let's Encrypt (opcional)
header "CONFIGURANDO SSL (OPCIONAL)"
read -p "¿Deseas instalar certificados SSL con Let's Encrypt? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    log "🔒 Instalando Certbot..."
    dnf install -y certbot python3-certbot-nginx
    
    log "🔒 Obteniendo certificados SSL..."
    certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN
    
    # Configurar renovación automática
    crontab -l | { cat; echo "0 12 * * * /usr/bin/certbot renew --quiet"; } | crontab -
    
    log "✅ SSL configurado"
else
    log "⏭️ SSL omitido"
fi

# Crear script de inicio rápido
header "CREANDO SCRIPTS DE GESTIÓN"
log "📝 Creando scripts de gestión..."

cat > start.sh << 'EOF'
#!/bin/bash
echo "🚀 Iniciando Admin-TK..."
cd /root/Admin-TK
pm2 start ecosystem.config.js
pm2 save
echo "✅ Admin-TK iniciado"
EOF

cat > stop.sh << 'EOF'
#!/bin/bash
echo "🛑 Deteniendo Admin-TK..."
pm2 stop admin-tk
echo "✅ Admin-TK detenido"
EOF

cat > restart.sh << 'EOF'
#!/bin/bash
echo "🔄 Reiniciando Admin-TK..."
cd /root/Admin-TK
pm2 restart admin-tk
echo "✅ Admin-TK reiniciado"
EOF

cat > status.sh << 'EOF'
#!/bin/bash
echo "📊 Estado de Admin-TK:"
pm2 status admin-tk
pm2 logs admin-tk --lines 20
EOF

cat > update.sh << 'EOF'
#!/bin/bash
echo "📦 Actualizando Admin-TK..."
cd /root/Admin-TK
pm2 stop admin-tk
git pull
npm install --production
npm run build
pm2 start admin-tk
echo "✅ Admin-TK actualizado"
EOF

chmod +x *.sh

log "✅ Scripts de gestión creados"

# Iniciar Admin-TK
header "INICIANDO ADMIN-TK"
log "🚀 Iniciando Admin-TK con PM2..."
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Verificar que todo esté funcionando
sleep 10

log "🔍 Verificando servicios..."

# Verificar PM2
if pm2 list | grep -q "admin-tk.*online"; then
    log "✅ Admin-TK ejecutándose en PM2"
else
    error "❌ Admin-TK no está ejecutándose en PM2"
fi

# Verificar puertos
if netstat -tlnp | grep -q ":$DASHBOARD_PORT"; then
    log "✅ Dashboard escuchando en puerto $DASHBOARD_PORT"
else
    warn "⚠️ Dashboard no está escuchando en puerto $DASHBOARD_PORT"
fi

# Verificar Nginx
if systemctl is-active --quiet nginx; then
    log "✅ Nginx ejecutándose"
else
    error "❌ Nginx no está ejecutándose"
fi

# Mostrar información final
header "INSTALACIÓN COMPLETADA"
echo -e "${GREEN}"
echo "  ╔═══════════════════════════════════════════════════════════════╗"
echo "  ║                                                               ║"
echo "  ║                 🎉 INSTALACIÓN COMPLETADA 🎉                  ║"
echo "  ║                                                               ║"
echo "  ║  Admin-TK está ahora ejecutándose en tu VPS                   ║"
echo "  ║                                                               ║"
echo "  ║  🌐 Dashboard: http://$DOMAIN                          ║"
echo "  ║  🌐 También:   http://$VPS_IP:$DASHBOARD_PORT                        ║"
echo "  ║  🔌 API:       http://$DOMAIN:$API_PORT                       ║"
echo "  ║                                                               ║"
echo "  ║  📁 Directorio: $PROJECT_DIR                           ║"
echo "  ║  📊 Logs:       pm2 logs admin-tk                            ║"
echo "  ║  🔄 Reiniciar:  ./restart.sh                                 ║"
echo "  ║  🛑 Detener:    ./stop.sh                                    ║"
echo "  ║  📈 Estado:     ./status.sh                                  ║"
echo "  ║                                                               ║"
echo "  ╚═══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

log "🎯 Comandos útiles:"
log "   pm2 status          - Ver estado de procesos"
log "   pm2 logs admin-tk   - Ver logs en tiempo real"
log "   pm2 restart admin-tk - Reiniciar Admin-TK"
log "   nginx -t            - Verificar configuración de Nginx"
log "   systemctl status nginx - Estado de Nginx"

log "✅ ¡Admin-TK está listo para usar!"
