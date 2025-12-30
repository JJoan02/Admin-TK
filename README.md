<p align="center">
  <img src="https://h.uguu.se/TWZcBwLl.jpg" width="900" alt="Banner del Proyecto" />
</p>

<h1 align="center">📦 Itsuki Nakano AI <small></h1>

<p align="center">
  <a href="https://github.com/leodevxyz/Itsuki-NakanoV5"><img src="https://img.shields.io/github/stars/leodevxyz/Itsuki-NakanoV5?style=social" alt="GitHub stars"/></a>
  <a href="#-descarga-y-estrella"><img src="https://img.shields.io/badge/⭐-Si_te_gusta%2C_dale_Star-orange" alt="Dale una estrella"/></a>
  <img src="https://img.shields.io/badge/Node.js-v20-green" alt="Node 20"/>
  <img src="https://img.shields.io/badge/Platform-Termux%20%7C%20Docker%20%7C%20Replit-blue" alt="Plataformas"/>
</p>

> **Itsuki Nakano AI** es un bot modular, estable y fácil de desplegar — pensado para Termux, Replit, VPS y Docker. Este README mejorado incluye secciones plegables, atajos visuales y llamados a la acción para convertir el README en algo más atractivo.

---

## 📋 Contenido rápido

* [Descripción](#-descripción)
* [Características](#-características)
* [Requisitos](#-requisitos)
* [Instalación rápida (Termux)](#-instalación-rápida-termux)
* [Despliegue 24/7 (PM2 / Docker / Replit)](#-despliegue-247-pm2--docker--replit)
* [Configuración](#-configuración)
* [Comandos importantes](#-comandos-importantes)
* [Changelog](#-historial-de-mejoras)
* [Contribuir](#-cómo-contribuir)
* [Seguridad](#-reporte-de-vulnerabilidades--seguridad)
* [Contacto](#-contacto)

---

## 🌟 ¿Te gusta este proyecto? ¡Dale una estrella!

<p align="center">
  <a href="https://github.com/leodevxyz/Itsuki-NakanoV5/stargazers" target="_blank" rel="noopener noreferrer">
    <img alt="Give Star" src="https://img.shields.io/badge/⭐-Dale%20una%20estrella%20en%20GitHub-yellow" />
  </a>
</p>

> Si este repo te ayudó, pulsa ⭐ en GitHub, eso nos motiva muchísimo y ayuda al proyecto a crecer.

## 🧾 🔍 Descripción

**Itsuki Nakano AI** es un bot modular, ligero y pensado para ser fácil de personalizar y desplegar. Ideal para administradores de comunidades que necesitan automatización 24/7 y un conjunto de comandos que pueden activarse o desactivarse como módulos.

Se diseñó con foco en:

* Arranque rápido en Termux y VPS.
* Opciones para integraciones externas (APIs) opcionales.
* Respaldo y logs automáticos para minimizar tiempos de inactividad.

## ✨ Características principales

<details>
<summary><strong>pulsa aqui</strong></summary>

* ✅ Arquitectura modular (habilita/deshabilita comandos)
* ✅ Soporte multiplataforma: Termux, Replit, Windows, Docker
* ✅ Gestión de permisos y niveles de usuario
* ✅ Integraciones opcionales con APIs externas
* ✅ Logs rotativos y backups automáticos
* ✅ Scripts opcionales para PM2 y Docker

</details>

## ⚙️ Requisitos

<details>
<summary><strong>pulsa aqui</strong></summary>

* Node.js v20+
* npm o Yarn
* ffmpeg (para multimedia)
* imagemagick (opcional)

> En entornos con recursos limitados (Termux, Replit) activa solo los módulos necesarios.

</details>

## 🛠 Instalación rápida (Termux)

<details>
<summary><strong>pulsa aqui</strong></summary>

```bash
# permisos y actualizaciones
termux-setup-storage
apt update && apt upgrade -y

# dependencias básicas
pkg install -y git nodejs ffmpeg imagemagick yarn

# clonar e instalar
git clone https://github.com/leoxito/Itsuki-NakanoV5.git
cd Itsuki-NakanoV5
# usar yarn o npm
yarn install
# crear archivo de configuración desde la plantilla
cp config.example.js .env.example .env

# iniciar
npm start
```

</details>

## 🚀 Despliegue 24/7 (PM2 / Docker / Replit)

<details>
<summary><strong>pulsa aqui</strong></summary>

### PM2 (VPS recomendado)

```bash
npm i -g pm2
# probar localmente
npm start
pm2 start index.js --name "Itsuki-Nakano"
pm2 save
pm2 logs Itsuki-Nakano
```

Ejemplo `ecosystem.config.js` (optimizado):

```js
module.exports = {
  apps: [
    {
      name: 'Itsuki-Nakano',
      script: 'index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '250M',
      env: { NODE_ENV: 'production' },
    },
  ],
};
```

### Docker (opcional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
CMD ["node", "index.js"]
```

### Replit

* Crea un repl y conecta con GitHub.
* Define variables de entorno en Secrets.
* Asegúrate de tener un script `start` en `package.json`.

</details>

## 🔧 Configuración

<details>
<summary><strong>pulsa aqui</strong></summary>

* `config.example.js` — plantilla con variables de entorno
* **IMPORTANTE:** nunca subas credenciales reales al repo

Ejemplo `.env`:

```
NODE_ENV=production
PORT=3000
BOT_TOKEN=tu_token_aqui
OWNER_ID=1234567890
DB_URL=mongodb://usuario:pass@host:27017/tu-db
LOG_LEVEL=info
```

</details>

## 📚 Comandos importantes

<details>
<summary><strong>pulsa aqui</strong></summary>

* `npm start` — iniciar en modo producción
* `npm run dev` — modo desarrollo (watch + nodemon)
* `npm test` — ejecutar tests
* `npm run backup` — respaldo rápido de la base de datos (script opcional)

`package.json` recomendado (scripts):

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js",
  "lint": "eslint .",
  "backup": "bash ./scripts/backup-db.sh"
}
```

</details>

## 📝 Historial de mejoras

* **2025-12-29 — v1.0.0** — Lanzamiento inicial, estructura modular, docs mejoradas.
* **2025-12-22 — v0.9.2** — Optimización de arranque, script de backup.
* **2025-11-10 — v0.9.0** — Logs rotativos, soporte PM2, comandos multimedia.

## 🤝 Cómo contribuir

<details>
<summary><strong>pulsa aqui</strong></summary>

1. Haz fork del repo
2. Crea una branch `feature/tu-cambio`
3. Escribe commits claros y abre un Pull Request

**Guía de estilo:** ESLint + Prettier. Añade tests cuando sea posible.

</details>

## 🔐 Reporte de vulnerabilidades / Seguridad

<details>
<summary><strong>pulsa aqui</strong></summary>

Si encuentras una vulnerabilidad, reporta a `hola@leodev.xyz` o usa el canal privado del proyecto. No publiques exploits ni credenciales en issues públicos.

</details>

## ⚠️ Problemas Comunes

<details>
<summary><strong>pulsa aqui</strong></summary>

* `ERROR: Cannot find module` → ejecuta `npm install` y revisa `NODE_PATH`.
* `Permission denied` en Termux → `termux-setup-storage` y verifica permisos.
* Problemas multimedia → asegurarse de que `ffmpeg` e `imagemagick` estén instalados.

</details>

## 👥 Equipo y créditos

| Avatar                                      |         Nombre | Rol                  |
| ------------------------------------------- | -------------: | :------------------- |
| ![LeoDev](https://github.com/leodevxyz.png) | **LeoDev.xyz** | Creador Principal    |
| ![Maicol](https://github.com/maicol.png)    |     **Maicol** | Colaborador (Código) |
| ![Joan TK](https://github.com/JJoan02.png)  |    **Joan TK** | Soporte & Asesoría   |

## 📬 Contacto

* Web: [https://leoDev.xyz](https://leoDev.xyz)
* GitHub: [https://github.com/leodevxyz](https://github.com/leodevxyz)
* Soporte: [https://github.com/JJoan02](https://github.com/JJoan02)
* Email: `hola@leodev.xyz` *(reemplaza por el contacto real antes de publicar)*

## 🧾 Licencia

Este proyecto se publica bajo **MIT License**.
