<p align="center">
  <img src="https://h.uguu.se/TWZcBwLl.jpg" width="900" alt="Banner del Proyecto" />
</p>

# 📦 Itsuki Nakano AI

<p align="center">
  <a href="https://github.com/leoxito/Itsuki-NakanoV5"><img src="https://img.shields.io/github/stars/leoxito/Itsuki-NakanoV5?style=social" alt="GitHub stars" /></a>
  <img src="https://img.shields.io/badge/Node.js-v20%2B-green" alt="Node 20" />
  <img src="https://img.shields.io/badge/Platform-Termux%20%7C%20Docker%20%7C%20Replit-blue" alt="Plataformas" />
  <img src="https://img.shields.io/badge/License-MIT-lightgrey" alt="MIT License" />
</p>

> **Aviso importante:** Este proyecto **no está afiliado** a `WhatsApp` ni a `WhatsApp LLC`. WhatsApp es una marca registrada de `WhatsApp LLC`. Itsuki Nakano AI es un desarrollo independiente.

## 🔎 Resumen rápido

Itsuki Nakano AI es un bot modular para WhatsApp basado en `baileys`. Diseñado para despliegues rápidos en Termux, Replit, VPS y Docker. Ideal para administradores de comunidades que desean automatización 24/7, módulos activables/desactivables, control de permisos y utilidades multimedia/AI/games.

## ✨ Características destacadas

- Arquitectura modular (activar / desactivar módulos).
- Soporte multiplataforma: Termux, Replit, VPS, Docker.
- Gestión de permisos: owner, admin, mod, user.
- Comandos multimedia: stickers, HD, transformación de imágenes.
- Juegos (RPG, Gacha, economía virtual).
- Funciones de IA y utilidades (búsquedas, descargas multi-plataforma).
- Sub-bots (JadiBot) y extensiones.
- Logs rotativos y backups automáticos.
- Scripts opcionales para PM2 y Docker.

## ⚙️ Requisitos

- Node.js v20+
- npm o yarn
- ffmpeg (para multimedia)
- imagemagick (opcional, stickers)
- Conexión a Internet
- (Opcional) MongoDB u otra base de datos si usas persistencia

> En entornos limitados (Termux, Replit) activa únicamente los módulos necesarios para reducir uso de memoria.

## 🚀 Instalación rápida (Termux / VPS)

<details>
<summary><strong>Instalación en Termux</strong> (pulsa para ver)</summary>

```bash
# dar permisos y actualizar
termux-setup-storage
apt update && apt upgrade -y

# instalar dependencias
pkg install -y git nodejs ffmpeg imagemagick yarn

# clonar e instalar
git clone https://github.com/leoxito/Itsuki-NakanoV5.git
cd Itsuki-NakanoV5
yarn install   # o npm install

# crear .env a partir de la plantilla
cp .env.example .env

# iniciar
npm start
````

</details>

<details>
<summary><strong>Instalación en Debian/Ubuntu / VPS</strong></summary>

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl ffmpeg imagemagick build-essential
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
git clone https://github.com/leoxito/Itsuki-NakanoV5.git
cd Itsuki-NakanoV5
npm install
cp .env.example .env
npm start
```

</details>

## 🛠 Despliegue 24/7

<details>
<summary><strong>PM2 (recomendado en VPS)</strong></summary>
  
```bash
npm i -g pm2
pm2 start index.js --name "Itsuki-Nakano"
pm2 save
pm2 logs Itsuki-Nakano
```

Ejemplo `ecosystem.config.js`:

```js
module.exports = {
  apps: [{
    name: 'Itsuki-Nakano',
    script: 'index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '300M',
    env: { NODE_ENV: 'production' }
  }]
};
```

### Docker

`Dockerfile` sugerido:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
ENV NODE_ENV=production
CMD ["node", "index.js"]
```

### Replit

* Crea un Repl, conecta el repo a tu cuenta.
* Añade variables de entorno en *Secrets*.
* Asegúrate de `package.json` tenga `"start": "node index.js"`.

## 🔧 Configuración (.env)

Copia `.env.example` y edita las variables esenciales:

```env
NODE_ENV=production
PORT=3000
BOT_TOKEN=                 # si aplica
OWNER_ID=                  # tu número (sin espacios)
DB_URL=mongodb://user:pass@host:27017/itsuki
LOG_LEVEL=info
ENABLE_BACKUPS=true
```

**IMPORTANTE:** Nunca subas credenciales reales al repositorio público.

## 🧩 Módulos

* Cada módulo debe residir en `modules/<nombre>/index.js`.
* Registrar en `config/modules.json`:

```json
[
  { "name": "moderacion", "enabled": true },
  { "name": "games", "enabled": true },
  { "name": "ai", "enabled": false }
]
```

* Para crear un módulo nuevo: seguir la interfaz interna del proyecto (exportar handler, metadata y permisos).

## 🛟 Mantener el bot activo en Termux (con PM2)

```bash
termux-wake-lock && npm i -g pm2 && pm2 start index.js && pm2 save && pm2 logs
```

Comandos PM2 útiles:

```bash
pm2 logs
pm2 stop index
pm2 start index
pm2 delete index
```

## 🔁 Actualizaciones y respaldo

* Para actualizar (ejemplo automático, usar con precaución):

```bash
# Ejemplo (no lo ejecutes si no entiendes lo que hace): descarga script de actualización
grep -q 'bash\|wget' <(dpkg -l) || apt install -y bash wget && wget -O - https://raw.githubusercontent.com/DevAlexJs/SakuraBot-MD/master/termux.sh | bash
```

* Respaldo de base de datos:

```bash
bash ./scripts/backup-db.sh
```

## ✅ Comandos importantes (ejemplos)

* `npm start` — iniciar en producción
* `npm run dev` — modo desarrollo (nodemon)
* `npm test` — ejecutar tests
* `npm run backup` — respaldo (si está configurado)
* `npm run qr` — generar QR (si tu implementación lo soporta)

</details>

## 📝 Historial de mejoras

* **2025-12-29 — v1.0.0** — Lanzamiento inicial, estructura modular, docs mejoradas.
* **2025-12-22 — v0.9.2** — Optimización de arranque, script de backup.
* **2025-11-10 — v0.9.0** — Logs rotativos, soporte PM2, comandos multimedia.

## 👥 Créditos y colaboradores

| Avatar                                      |         Nombre | Rol                  |
| ------------------------------------------- | -------------: | :------------------- |
| ![LeoDev](https://github.com/leoxito.png) | **LeoDev.xyz** | Creador Principal    |
| ![Maicol](https://github.com/maicol.png)    |     **Maicol** | Colaborador (Código) |
| ![Joan TK](https://github.com/JJoan02.png)  |    **Joan TK** | Soporte & Asesoría   |

## 📬 Enlaces y contacto

* Web: [https://leoDev.xyz](https://leoDev.xyz)
* GitHub: [https://github.com/leodevxyz](https://github.com/leodevxyz) / [https://github.com/leoxito](https://github.com/leoxito)
* Soporte / Contacto: `hola@leodev.xyz` *(reemplaza antes de publicar)*

> Enlaces de ejemplo (usa los oficiales de tu repo si cambian).

## 🛡 Reporte de vulnerabilidades

Si encuentras una vulnerabilidad: contacta por email `hola@leodev.xyz` o abre un issue privado en el repositorio. No publiques exploits o credenciales en issues públicos.

## 📝 Licencia

Este proyecto se publica bajo **MIT License**. Consulta `LICENSE` para más detalles.
