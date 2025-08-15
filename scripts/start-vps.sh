#!/bin/bash

# scripts/start-vps.sh - Script de inicio para VPS Admin-TK

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

# Configuración
PROJECT_DIR="/root/Admin-TK"
DOMAIN="admin-tk.fun"
VPS_IP="206.183.129.67"
DASHBOARD_PORT="3000"
API_PORT="3001"

log "🚀 Iniciando Admin-TK en VPS..."
log "📍 Dominio: $DOMAIN"
log "🌐 IP: $VPS_IP"

# Verificar si estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    error "No se encontró package.json. Asegúrate de estar en el directorio del proyecto."
    exit 1
fi

# Verificar Node.js
if ! command -v node &> /dev/null; then
    error "Node.js no está instalado. Por favor instala Node.js 18 o superior."
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    error "Node.js versión 18 o superior es requerida. Versión actual: $(node --version)"
    exit 1
fi

log "✅ Node.js $(node --version) detectado"

# Verificar npm
if ! command -v npm &> /dev/null; then
    error "npm no está instalado."
    exit 1
fi

log "✅ npm $(npm --version) detectado"

# Instalar dependencias si es necesario
if [ ! -d "node_modules" ]; then
    log "📦 Instalando dependencias..."
    npm install
else
    log "✅ Dependencias ya instaladas"
fi

# Compilar TypeScript si es necesario
if [ ! -d "dist" ] || [ "src" -nt "dist" ]; then
    log "🔨 Compilando TypeScript..."
    npm run build
else
    log "✅ Código ya compilado"
fi

# Verificar puertos disponibles
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        warn "Puerto $port ya está en uso"
        return 1
    else
        log "✅ Puerto $port disponible"
        return 0
    fi
}

check_port $DASHBOARD_PORT
check_port $API_PORT

# Configurar variables de entorno
log "⚙️ Configurando variables de entorno..."

export NODE_ENV=production
export DASHBOARD_PORT=$DASHBOARD_PORT
export API_PORT=$API_PORT
export DOMAIN=$DOMAIN
export VPS_IP=$VPS_IP

# Crear archivo .env si no existe
if [ ! -f ".env" ]; then
    log "📝 Creando archivo .env..."
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
EOF
    log "✅ Archivo .env creado"
else
    log "✅ Archivo .env ya existe"
fi

# Crear directorios necesarios
log "📁 Creando directorios necesarios..."
mkdir -p storage/database
mkdir -p storage/backups
mkdir -p logs
mkdir -p tmp

# Configurar permisos
chmod +x scripts/*.sh 2>/dev/null || true

# Verificar configuración de firewall
log "🔥 Verificando configuración de firewall..."
if command -v ufw &> /dev/null; then
    ufw allow $DASHBOARD_PORT/tcp
    ufw allow $API_PORT/tcp
    ufw allow 80/tcp
    ufw allow 443/tcp
    log "✅ Puertos abiertos en UFW"
elif command -v firewall-cmd &> /dev/null; then
    firewall-cmd --permanent --add-port=$DASHBOARD_PORT/tcp
    firewall-cmd --permanent --add-port=$API_PORT/tcp
    firewall-cmd --permanent --add-port=80/tcp
    firewall-cmd --permanent --add-port=443/tcp
    firewall-cmd --reload
    log "✅ Puertos abiertos en firewalld"
else
    warn "No se detectó UFW ni firewalld. Asegúrate de que los puertos estén abiertos."
fi

# Función para manejar señales
cleanup() {
    log "🛑 Deteniendo Admin-TK..."
    if [ ! -z "$ADMIN_TK_PID" ]; then
        kill $ADMIN_TK_PID 2>/dev/null || true
        wait $ADMIN_TK_PID 2>/dev/null || true
    fi
    log "✅ Admin-TK detenido"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Iniciar Admin-TK
log "🚀 Iniciando Admin-TK..."
log "📊 Dashboard estará disponible en: http://$DOMAIN:$DASHBOARD_PORT"
log "🔌 API estará disponible en: http://$DOMAIN:$API_PORT"
log "🌐 Dominio principal: https://$DOMAIN"

# Iniciar en background y capturar PID
node index.ts &
ADMIN_TK_PID=$!

log "✅ Admin-TK iniciado con PID: $ADMIN_TK_PID"

# Esperar un momento para verificar que se inició correctamente
sleep 5

if kill -0 $ADMIN_TK_PID 2>/dev/null; then
    log "✅ Admin-TK ejecutándose correctamente"
    
    # Verificar que los puertos estén escuchando
    sleep 10
    
    if lsof -Pi :$DASHBOARD_PORT -sTCP:LISTEN -t >/dev/null; then
        log "✅ Dashboard escuchando en puerto $DASHBOARD_PORT"
    else
        error "❌ Dashboard no está escuchando en puerto $DASHBOARD_PORT"
    fi
    
    if lsof -Pi :$API_PORT -sTCP:LISTEN -t >/dev/null; then
        log "✅ API escuchando en puerto $API_PORT"
    else
        warn "⚠️ API no está escuchando en puerto $API_PORT"
    fi
    
    log "🎉 Admin-TK iniciado exitosamente!"
    log "🌐 Accede al dashboard en: http://$DOMAIN:$DASHBOARD_PORT"
    log "📱 O directamente en: https://$DOMAIN"
    
    # Mantener el script ejecutándose
    wait $ADMIN_TK_PID
else
    error "❌ Admin-TK falló al iniciar"
    exit 1
fi
